import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { getStores, addStore, deleteStore, updateStore, searchStores } from '../redux/store/storeSlice'; // Import searchStores thunk
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AgGridReact } from 'ag-grid-react'; // Import AG Grid React component
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Theme CSS

// Import and register AG Grid modules
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
ModuleRegistry.registerModules([AllCommunityModule]);


const storeSchema = Yup.object().shape({
    storeName: Yup.string().required('Store Name is required'),
    storeDescription: Yup.string().required('Store Description is required'),
    storeImage: Yup.string().url('Enter a valid image URL').required('Store image is required'),
    homePageTitle: Yup.string().required('Home Page Title is required'),
    showOnHomepage: Yup.boolean(),
    popularStore: Yup.boolean(),
    storeType: Yup.string().required('Store Type is required'),
    discountPercentage: Yup.number()
      .typeError('Must be a number')
      .required('Discount Percentage is required'),
    storeHtmlContent: Yup.string().required('HTML Content is required'),
  });


const Stores = () => {
  const dispatch = useDispatch();
  // Use `stores` for all data and `searchResults` for search-specific data
  const { stores, searchResults, loading } = useSelector((state) => state.store);
  const [editStore, setEditStore] = useState(null);

  // AG Grid specific state and ref
  const gridRef = useRef();
  const [searchText, setSearchText] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(''); // New state for debounced search

  // Debounce effect for search term
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchText);
    }, 300); // 300ms debounce delay

    return () => {
      clearTimeout(handler);
    };
  }, [searchText]); // Only re-run if searchText changes

  // Effect to dispatch search API call or get all stores based on debounced term
  useEffect(() => {
    if (debouncedSearchTerm.length > 0) {
      dispatch(searchStores(debouncedSearchTerm)); // Dispatch backend search
    } else {
      dispatch(getStores()); // Fetch all stores when search is empty
    }
  }, [debouncedSearchTerm, dispatch]); // Re-run when debouncedSearchTerm changes

  // AG Grid Column Definitions
  const [columnDefs] = useState([
    { headerName: 'Name', field: 'storeName', sortable: true, filter: true, flex: 1 },
    { headerName: 'Description', field: 'storeDescription', sortable: true, filter: true, flex: 1 },
    {
      headerName: 'Image',
      field: 'storeImage',
      cellRenderer: (params) => (
        <img src={params.value} alt="store" className="h-12 w-12 object-fill rounded-md" />
      ),
      width: 100,
      resizable: false,
    },
    { headerName: 'Homepage Title', field: 'homePageTitle', sortable: true, filter: true, flex: 1 },
    { headerName: 'Type', field: 'storeType', sortable: true, filter: true, width: 120 },
    { headerName: 'Discount', field: 'discountPercentage', sortable: true, filter: true, width: 120,
      cellRenderer: (params) => `${params.value}%` // Display with percentage sign
    },
    {
      headerName: 'Show on Homepage',
      field: 'showOnHomepage',
      cellRenderer: (params) => (params.value ? '✅' : '❌'),
      width: 150,
      filter: true,
    },
    {
      headerName: 'Popular',
      field: 'popularStore',
      cellRenderer: (params) => (params.value ? '✅' : '❌'),
      width: 100,
      filter: true,
    },
    { headerName: 'HTML Content', field: 'storeHtmlContent', sortable: true, filter: true, flex: 1,
      cellRenderer: (params) => params.value ? `${params.value.substring(0, 50)}...` : '' // Truncate for display
    },
    {
      headerName: 'Actions',
      field: '_id',
      cellRenderer: (params) => (
        <div className="flex space-x-2 items-center h-full">
          <button
            onClick={() => handleDelete(params.value)}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-xs"
          >
            Delete
          </button>
          <button
            onClick={() => handleEdit(params.data)}
            className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 text-xs"
          >
            Edit
          </button>
        </div>
      ),
      width: 150,
      resizable: false,
    },
  ]);

  // AG Grid default col defs for common settings
  const defaultColDef = useCallback(() => ({
    flex: 1,
    minWidth: 100,
    resizable: true,
  }), []);

  // AG Grid ready callback to access the grid API
  const onGridReady = useCallback((params) => {
    params.api.sizeColumnsToFit();
  }, []);

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteStore(id)).unwrap();
      toast.success('Store deleted!');
      // After delete, re-fetch data based on current search state
      if (debouncedSearchTerm.length > 0) {
        dispatch(searchStores(debouncedSearchTerm));
      } else {
        dispatch(getStores());
      }
    } catch (error) { // Catch error for toast message
      toast.error(`Failed to delete store: ${error.message || 'Unknown error'}`);
    }
  };

  const handleEdit = (store) => {
    setEditStore(store);
    // Formik's enableReinitialize prop will handle populating the form
    // when editStore state changes.
  };

  const handleUpdate = async (values, resetForm) => {
    try {
      await dispatch(updateStore({ id: editStore._id, data: values })).unwrap();
      toast.success('Store updated!');
      // After update, re-fetch data based on current search state
      if (debouncedSearchTerm.length > 0) {
        dispatch(searchStores(debouncedSearchTerm));
      } else {
        dispatch(getStores());
      }
      resetForm();
      setEditStore(null);
    } catch (error) { // Catch error for toast message
      toast.error(`Failed to update store: ${error.message || 'Unknown error'}`);
    }
  };

  // Determine which data array to use for AG Grid
  const dataToDisplay = searchText.length > 0 ? searchResults : stores;

  return (
    <div className="p-8 max-w-7xl mx-auto flex flex-col min-h-screen"> {/* Changed h-screen to min-h-screen */}
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-6">Manage Stores</h1>

      {/* Search Input for AG Grid */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search stores..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* AG Grid Table */}
      {loading ? (
        <div className="text-center py-8">Loading Stores...</div>
      ) : dataToDisplay?.length > 0 ? (
        <div className="ag-theme-alpine flex-grow" style={{ width: '100%' }}>
          <AgGridReact
            ref={gridRef}
            rowData={dataToDisplay}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            onGridReady={onGridReady}
            pagination={true}
            paginationPageSize={10}
            domLayout='autoHeight'
          />
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          {searchText.length > 0 ? 'No stores found for your search.' : 'No stores available.'}
        </div>
      )}

      {/* ✅ FORM SECTION */}
      <Formik
        enableReinitialize
        initialValues={
            editStore || {
                storeName: '',
                storeDescription: '',
                storeImage: '',
                homePageTitle: '',
                showOnHomepage: false,
                storeType: '',
                discountPercentage: '',
                popularStore: false,
                storeHtmlContent: '',
              }
        }
        validationSchema={storeSchema}
        onSubmit={async (values, { resetForm }) => {
          try {
            if (editStore) {
              await handleUpdate(values, resetForm);
            } else {
              await dispatch(addStore(values)).unwrap();
              toast.success('Store added!');
              resetForm();
              // After add, re-fetch data based on current search state
              if (debouncedSearchTerm.length > 0) {
                dispatch(searchStores(debouncedSearchTerm));
              } else {
                dispatch(getStores());
              }
            }
          } catch (error) { // Catch error for toast message
            toast.error(`Submission failed: ${error.message || 'Unknown error'}`);
          }
        }}
      >
        {() => (
          <Form className="bg-white p-6 shadow-md rounded-lg space-y-6 mt-10">
            <div>
              <label className="block mb-1 font-medium">Store Name</label>
              <Field name="storeName" className="w-full px-3 py-2 border rounded-md" />
              <ErrorMessage name="storeName" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div>
              <label className="block mb-1 font-medium">Store Description</label>
              <Field
                as="textarea"
                name="storeDescription"
                className="w-full px-3 py-2 border rounded-md"
              />
              <ErrorMessage
                name="storeDescription"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Store Image URL</label>
              <Field name="storeImage" className="w-full px-3 py-2 border rounded-md" />
              <ErrorMessage name="storeImage" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div>
              <label className="block mb-1 font-medium">Homepage Title</label>
              <Field name="homePageTitle" className="w-full px-3 py-2 border rounded-md" />
              <ErrorMessage
                name="homePageTitle"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Store Type</label>
              <Field
                as="select"
                name="storeType"
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="">Select Store Type</option>
                <option value="Top">Top</option>
                <option value="Brands">Brands</option>
                <option value="Popular">Popular</option>
                <option value="Popular Store">Popular Store</option>
              </Field>
              <ErrorMessage
                name="storeType"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>


            <div>
              <label className="block mb-1 font-medium">Discount Percentage</label>
              <Field
                name="discountPercentage"
                type="number"
                className="w-full px-3 py-2 border rounded-md"
              />
              <ErrorMessage
                name="discountPercentage"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            {/* ✅ Checkbox: Popular Store */}
            <div className="flex items-center space-x-2">
              <Field type="checkbox" name="popularStore" />
              <label className="font-medium">Popular Store</label>
            </div>

            {/* ✅ Rich Text / HTML Content */}
            <div>
              <label className="block mb-1 font-medium">Store HTML Content</label>
              <Field
                as="textarea"
                name="storeHtmlContent"
                className="w-full px-3 py-2 border rounded-md"
                rows={5}
            />
              <ErrorMessage
                name="storeHtmlContent"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>


            <div className="flex items-center space-x-2">
              <Field type="checkbox" name="showOnHomepage" />
              <label className="font-medium">Show on Homepage</label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700"
            >
              {loading ? 'Submitting...' : editStore ? 'Update Store' : 'Add Store'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Stores;
