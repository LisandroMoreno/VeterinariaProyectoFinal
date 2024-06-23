// TableComponent.js
import React from "react";
import PropTypes from "prop-types";
import { Table, Button } from "react-bootstrap";

const TablaC = ({ columns, data, handleDelete }) => {
  return (
    <Table striped bordered hover className="text-center">
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.key}>{column.header}</th>
          ))}
          {handleDelete && <th>Acciones</th>}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr className="align-middle" key={rowIndex}>
            {columns.map((column) => (
              <td key={column.key}>{row[column.key]}</td>
            ))}
            {handleDelete && (
              <td className="align-middle">
                <Button variant="danger" onClick={() => handleDelete(row._id)}>
                  <i className="fa-solid fa-trash"></i>
                </Button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

TablaC.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      header: PropTypes.string.isRequired,
    })
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleDelete: PropTypes.func,
};

export default TablaC;
