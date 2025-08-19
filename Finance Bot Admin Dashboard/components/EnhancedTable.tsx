import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Checkbox } from './ui/checkbox';
import { Search, Filter, Download, Settings, Save, Eye, MoreHorizontal, Columns3, RefreshCw } from 'lucide-react';

interface Column {
  key: string;
  label: string;
  sortable?: boolean;
  filterable?: boolean;
  visible?: boolean;
  width?: string;
}

interface EnhancedTableProps {
  title: string;
  description?: string;
  columns: Column[];
  data: any[];
  onRowAction?: (action: string, row: any) => void;
  onExport?: (format: 'csv' | 'xlsx') => void;
  onRefresh?: () => void;
  loading?: boolean;
  searchPlaceholder?: string;
  filters?: {
    key: string;
    label: string;
    type: 'select' | 'date' | 'number';
    options?: { value: string; label: string }[];
  }[];
  actions?: {
    key: string;
    label: string;
    icon?: React.ReactNode;
    variant?: 'default' | 'destructive' | 'outline';
  }[];
  savedViews?: {
    name: string;
    filters: Record<string, any>;
    columns: string[];
  }[];
}

export function EnhancedTable({
  title,
  description,
  columns: initialColumns,
  data,
  onRowAction,
  onExport,
  onRefresh,
  loading = false,
  searchPlaceholder = "Search...",
  filters = [],
  actions = [],
  savedViews = []
}: EnhancedTableProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortColumn, setSortColumn] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [activeFilters, setActiveFilters] = useState<Record<string, any>>({});
  const [columns, setColumns] = useState(initialColumns.map(col => ({ ...col, visible: col.visible ?? true })));
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [currentView, setCurrentView] = useState<string>('default');

  const visibleColumns = columns.filter(col => col.visible);

  const filteredData = data.filter(row => {
    // Search filter
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = Object.values(row).some(value => 
        String(value).toLowerCase().includes(searchLower)
      );
      if (!matchesSearch) return false;
    }

    // Active filters
    for (const [key, value] of Object.entries(activeFilters)) {
      if (value && row[key] !== value) return false;
    }

    return true;
  });

  const sortedData = filteredData.sort((a, b) => {
    if (!sortColumn) return 0;
    
    const aVal = a[sortColumn];
    const bVal = b[sortColumn];
    
    if (aVal === bVal) return 0;
    
    const comparison = aVal < bVal ? -1 : 1;
    return sortDirection === 'asc' ? comparison : -comparison;
  });

  const handleSort = (columnKey: string) => {
    if (sortColumn === columnKey) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(columnKey);
      setSortDirection('asc');
    }
  };

  const handleColumnVisibilityChange = (columnKey: string, visible: boolean) => {
    setColumns(cols => 
      cols.map(col => 
        col.key === columnKey ? { ...col, visible } : col
      )
    );
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(new Set(Array.from({ length: sortedData.length }, (_, i) => i)));
    } else {
      setSelectedRows(new Set());
    }
  };

  const handleRowSelect = (index: number, checked: boolean) => {
    const newSelected = new Set(selectedRows);
    if (checked) {
      newSelected.add(index);
    } else {
      newSelected.delete(index);
    }
    setSelectedRows(newSelected);
  };

  const exportData = (format: 'csv' | 'xlsx') => {
    if (onExport) {
      onExport(format);
    } else {
      // Basic CSV export fallback
      const csvContent = [
        visibleColumns.map(col => col.label).join(','),
        ...sortedData.map(row => 
          visibleColumns.map(col => String(row[col.key])).join(',')
        )
      ].join('\n');
      
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${title.replace(/\s+/g, '_')}.csv`;
      a.click();
      window.URL.revokeObjectURL(url);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </div>
          <div className="flex items-center gap-2">
            {onRefresh && (
              <Button variant="outline" size="sm" onClick={onRefresh} disabled={loading}>
                <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Controls Row */}
        <div className="flex items-center gap-4 mb-6">
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>

          {/* Saved Views */}
          {savedViews.length > 0 && (
            <Select value={currentView} onValueChange={setCurrentView}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Select view" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default View</SelectItem>
                {savedViews.map(view => (
                  <SelectItem key={view.name} value={view.name}>
                    {view.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          {/* Filters */}
          {filters.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                  {Object.keys(activeFilters).length > 0 && (
                    <Badge className="ml-2 h-5 w-5 rounded-full p-0 text-xs">
                      {Object.keys(activeFilters).length}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {filters.map(filter => (
                  <div key={filter.key} className="px-2 py-1">
                    <label className="text-sm font-medium">{filter.label}</label>
                    {filter.type === 'select' && filter.options ? (
                      <Select
                        value={activeFilters[filter.key] || ''}
                        onValueChange={(value) => 
                          setActiveFilters(prev => ({
                            ...prev,
                            [filter.key]: value || undefined
                          }))
                        }
                      >
                        <SelectTrigger className="w-full mt-1">
                          <SelectValue placeholder="All" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">All</SelectItem>
                          {filter.options.map(option => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <Input
                        type={filter.type === 'date' ? 'date' : filter.type === 'number' ? 'number' : 'text'}
                        value={activeFilters[filter.key] || ''}
                        onChange={(e) =>
                          setActiveFilters(prev => ({
                            ...prev,
                            [filter.key]: e.target.value || undefined
                          }))
                        }
                        className="w-full mt-1"
                      />
                    )}
                  </div>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {/* Column Picker */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Columns3 className="h-4 w-4 mr-2" />
                Columns
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Show Columns</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {columns.map(column => (
                <DropdownMenuCheckboxItem
                  key={column.key}
                  checked={column.visible}
                  onCheckedChange={(checked) => 
                    handleColumnVisibilityChange(column.key, checked || false)
                  }
                >
                  {column.label}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Export */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => exportData('csv')}>
                Export as CSV
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => exportData('xlsx')}>
                Export as Excel
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Bulk Actions */}
        {selectedRows.size > 0 && (
          <div className="flex items-center gap-2 mb-4 p-2 bg-muted rounded-md">
            <span className="text-sm">{selectedRows.size} rows selected</span>
            {actions.map(action => (
              <Button
                key={action.key}
                variant={action.variant || 'outline'}
                size="sm"
                onClick={() => {
                  const selectedData = Array.from(selectedRows).map(index => sortedData[index]);
                  onRowAction?.(action.key, selectedData);
                }}
              >
                {action.icon && <span className="mr-2">{action.icon}</span>}
                {action.label}
              </Button>
            ))}
            <Button variant="ghost" size="sm" onClick={() => setSelectedRows(new Set())}>
              Clear
            </Button>
          </div>
        )}

        {/* Table */}
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedRows.size === sortedData.length && sortedData.length > 0}
                    {...(selectedRows.size > 0 && selectedRows.size < sortedData.length ? { indeterminate: true } : {})}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                {visibleColumns.map(column => (
                  <TableHead 
                    key={column.key}
                    className={column.sortable ? 'cursor-pointer hover:bg-muted/50' : ''}
                    onClick={() => column.sortable && handleSort(column.key)}
                    style={{ width: column.width }}
                  >
                    <div className="flex items-center gap-1">
                      {column.label}
                      {column.sortable && sortColumn === column.key && (
                        <span className="text-xs">
                          {sortDirection === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </div>
                  </TableHead>
                ))}
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Checkbox
                      checked={selectedRows.has(index)}
                      onCheckedChange={(checked) => handleRowSelect(index, !!checked)}
                    />
                  </TableCell>
                  {visibleColumns.map(column => (
                    <TableCell key={column.key}>
                      {row[column.key]}
                    </TableCell>
                  ))}
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {actions.map(action => (
                          <DropdownMenuItem 
                            key={action.key}
                            onClick={() => onRowAction?.(action.key, row)}
                          >
                            {action.icon && <span className="mr-2">{action.icon}</span>}
                            {action.label}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination would go here */}
        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-muted-foreground">
            Showing {sortedData.length} of {data.length} entries
          </div>
        </div>
      </CardContent>
    </Card>
  );
}