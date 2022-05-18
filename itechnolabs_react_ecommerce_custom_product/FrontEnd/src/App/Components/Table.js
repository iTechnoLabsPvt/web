import React from 'react'
import { useTable, useFilters, usePagination, useGlobalFilter } from 'react-table';
import TableActions from "./TableActions";

// value and onChange function
const GlobalFilter = ({ globalFilter, setGlobalFilter }) => {
  return (
    <div 
    className = 'filterClassParent'>
    <input
      value={globalFilter || ""}
      onChange={e => {
        setGlobalFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      placeholder={`Search...`}
      className = 'filterClass'
    />
    </div>
  );
};

function Table({ columns, data, tableType, fileName }) {
    const filterTypes = React.useMemo(
      () => ({
        text: (rows, id, filterValue) => {
          return rows.filter(row => {
            const rowValue = row.values[id];
            return rowValue !== undefined
              ? String(rowValue)
                  .toLowerCase()
                  .startsWith(String(filterValue).toLowerCase())
              : true;
          });
        }
      }),
      []
    );
    // Use the state and functions returned from useTable to build your UI
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      prepareRow,
    
       page,    canPreviousPage,
       canNextPage,
       pageOptions,
       pageCount,
       gotoPage,
       nextPage,
       previousPage,
       setPageSize,
       state: { pageIndex, pageSize, globalFilter },
       setGlobalFilter
    } = useTable({
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 5 },
      // filterTypes
    }, 
    useFilters,
    useGlobalFilter,
    usePagination
      )
    // Render the UI for your table
    return (
    <div>
      <div className="action-main-outer">
      <div className = "actionOnTables">
        <GlobalFilter
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
        <TableActions 
          columns ={columns}
          data ={globalFilter ? page : data}
          tableType = {tableType} 
          fileName = {fileName} 
          flag = {globalFilter ? true : false}
        />
      </div>
      <div className="table-responsive">
      <table {...getTableProps()} className="maintable react-table custom-react-table">
        <thead className="tablehead">
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
         
          {page.length ? page.map((row, i) => {
            prepareRow(row)

            return (
              <tr {...row.getRowProps()} className={i%2 && "oddrow"}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          }) : <tr className="no-data-found">
            <td colSpan="100%" style={{textAlign:"left"}}>No Data Found.</td></tr>}
        </tbody>
      </table>
      </div>
      </div>
       {pageOptions.length>0 && 
      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>
        <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page)
            }}
            style={{ width: '100px' }}
          />
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
       {/* <span>
         <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page)
            }}
            style={{ width: '100px' }}
          />
        </span>{' '} */}
        <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value))
          }}
        >
          {[5, 10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
} 
</div>
    )
  }
  export default Table;