import React, { useState, useEffect } from "react";
import { Modal, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Container from "@mui/material/Container";
import BookService from "../../api/BookService";
import Toaster from "../../utils/Toaster";
import styles from "./Admin.module.css";
import AddBook from "./AddBook";
import UpdateBook from "./UpdateBook";

const Admin = () => {
  const [book, setBook] = useState({});

  const handleUpdate = (id) => {
    // get the book by id
    BookService.GetBookById(id).then((res) => {
      // handle axios response with status code
      if (res.status === 200) {
        // set the book data
        setBook(res.data.result);
        console.log(res.data.result);
        // open the modal
        setOpen(true);
      }
    }).catch((err) => {
      Toaster({
        position: "top-right",
        condition: "error",
        msg: err.message,
      });
    });
  };

  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const handleDelete = (id) => {
    BookService.DeleteBookById(id)
      .then((res) => {
        // handle axios response with status code
        if (res.status === 200) {
          Toaster({
            position: "top-right",
            condition: "success",
            msg: "Book Deleted Successfully",
          });
          // update the rows after delete
          setRows(rows.filter((row) => row.id !== id));
        }
      })
      .catch((err) => {
        console.log(err);
        Toaster({
          position: "top-right",
          condition: "error",
          msg: err.message,
        });
      });
  };

  const UpdateDelBtn = ({ id }) => {
    return (
      // two buttons in row update delete
      <div>
        <button
          className={`${styles.btn} ${styles.gbtn}`}
          onClick={() => handleUpdate(id)}
        >
          Update
        </button>
        <button
          className={`${styles.btn} ${styles.rbtn}`}
          onClick={() => handleDelete(id)}
        >
          Delete
        </button>
      </div>
    );
  };

  const columns = [
    { field: "name", headerName: "Book Name", width: 130 },
    { field: "price", headerName: "Price", width: 70 },
    { field: "category", headerName: "Category", width: 130, sortable: false },
    {
      sortable: false,
      width: 180,
      renderCell: ({ id }) => <UpdateDelBtn id={id} />,
    },
  ];

  const [rows, setRows] = useState([]);

  useEffect(() => {
    BookService.GetAllBooks()
      .then((res) => {
        setRows(res.data.result);
      })
      .catch((err) => {
        Toaster({
          position: "top-right",
          condition: "error",
          msg: err,
        });
      });


  }, []);

  return (
    <div style={{ width: "100%" }}>
      <Toaster />
      {/* Listing Books */}
      <Typography variant="h3" component="h3" style={{ textAlign: "center" }}>
        Book Listing
      </Typography>
      <Container>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection={false}
        />
      </Container>
      <Container>
        <AddBook />
      </Container>

      {/* Update Modal */}
      <Container>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Container style={{
            backgroundColor: "white",
            padding: "20px",
          }}>
            <UpdateBook ubook={book} handleClose={handleClose}/>
          </Container>
        </Modal>
      </Container>
    </div>
  );
};

export default Admin;
