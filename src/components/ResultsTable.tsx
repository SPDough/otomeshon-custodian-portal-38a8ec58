
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { SortAsc, SortDesc } from "lucide-react";

interface Column {
  id: string;
  header: string;
}

interface ResultData {
  id: number;
  [key: string]: any;
}

interface ResultsTableProps {
  data: ResultData[];
  columns: Column[];
}

const ResultsTable = ({ data, columns }: ResultsTableProps) => {
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);

  // Sort the data based on the current sort configuration
  const sortedData = [...data].sort((a, b) => {
    if (!sortConfig) return 0;
    
    const { key, direction } = sortConfig;
    
    if (a[key] < b[key]) {
      return direction === "asc" ? -1 : 1;
    }
    if (a[key] > b[key]) {
      return direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  const handleSort = (key: string) => {
    let direction: "asc" | "desc" = "asc";
    
    if (sortConfig && sortConfig.key === key) {
      direction = sortConfig.direction === "asc" ? "desc" : "asc";
    }
    
    setSortConfig({ key, direction });
  };

  return (
    <div className="w-full overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.id} className="whitespace-nowrap">
                <Button
                  variant="ghost"
                  size="sm"
                  className="py-1 h-auto font-medium"
                  onClick={() => handleSort(column.id)}
                >
                  {column.header}
                  {sortConfig?.key === column.id && (
                    <span className="ml-2">
                      {sortConfig.direction === "asc" ? (
                        <SortAsc className="h-4 w-4" />
                      ) : (
                        <SortDesc className="h-4 w-4" />
                      )}
                    </span>
                  )}
                </Button>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedData.length > 0 ? (
            sortedData.map((row) => (
              <TableRow key={row.id}>
                {columns.map((column) => (
                  <TableCell key={`${row.id}-${column.id}`} className="whitespace-nowrap">
                    {row[column.id]}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ResultsTable;
