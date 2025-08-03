// ContactsTable.jsx
import React, { useEffect, useMemo, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContacts } from "../redux/contact/contactSlice"; // adjust path
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

export default function ContactsTable() {
  const dispatch = useDispatch();
  const gridRef = useRef(null);
  const {
    list,
    fetchStatus,
    fetchError,
  } = useSelector((state) => state.contact);

  useEffect(() => {
    if (fetchStatus === "idle") {
      dispatch(fetchContacts());
    }
  }, [dispatch, fetchStatus]);

  const columnDefs = useMemo(
    () => [
      {
        headerName: "Name",
        valueGetter: (params) => `${params.data.firstName || ""} ${params.data.lastName || ""}`,
        flex: 1,
        minWidth: 180,
        sortable: true,
        filter: true,
      },
      {
        headerName: "Email",
        field: "email",
        flex: 1.5,
        minWidth: 220,
        sortable: true,
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Phone",
        field: "phone",
        flex: 1,
        minWidth: 160,
        sortable: true,
        filter: true,
        cellRenderer: (params) => params.value || "-",
      },
      {
        headerName: "Subject",
        field: "subject",
        flex: 1,
        minWidth: 180,
        sortable: true,
        filter: true,
        cellRenderer: (params) => params.value || "-",
      },
      {
        headerName: "Message",
        field: "message",
        flex: 2,
        minWidth: 250,
        sortable: false,
        filter: false,
        tooltipField: "message",
        cellClass: "truncate-cell",
      },
      {
        headerName: "Submitted At",
        field: "createdAt",
        flex: 1.5,
        minWidth: 200,
        sortable: true,
        filter: "agDateColumnFilter",
        valueFormatter: (params) =>
          params.value
            ? new Date(params.value).toLocaleString(undefined, {
                dateStyle: "short",
                timeStyle: "short",
              })
            : "-",
      },
    ],
    []
  );

  const defaultColDef = useMemo(
    () => ({
      resizable: true,
      filter: true,
    }),
    []
  );

  const onGridReady = useCallback((params) => {
    // optional: fit columns initially
    params.api.sizeColumnsToFit();
  }, []);

  return (
    <div className="px-4 md:px-8 lg:px-16 py-8 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">All Contacts</h1>

      {fetchStatus === "loading" && (
        <div className="py-8 text-center">Loading contacts...</div>
      )}
      {fetchStatus === "failed" && (
        <div className="text-red-600 mb-4">Error: {fetchError}</div>
      )}

      <div className="ag-theme-alpine" style={{ width: "100%", height: "600px" }}>
        <AgGridReact
          ref={gridRef}
          rowData={list}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          onGridReady={onGridReady}
          pagination={true}
          paginationPageSize={10}
          suppressRowClickSelection={false}
          rowSelection="single"
          animateRows={true}
          domLayout="autoHeight"
          tooltipShowDelay={200}
          className="rounded-lg"
        />
      </div>
    </div>
  );
}
