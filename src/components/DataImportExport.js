import React from "react";
import Button from "@material-ui/core/Button";
import GetAppIcon from "@material-ui/icons/GetApp";
import PublishIcon from "@material-ui/icons/Publish";

function DataImportExport({ updateCollection }) {
  const importData = (e) => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = (e) => {
      localStorage.setItem("collection", e.target.result);
      window.location.reload(false);
    };
  };
  return (
    <div className="DataImportExport">
      <div>
        <Button
          // onClick={() => downloadData()}
          color="primary"
          variant="contained"
          href={`data:text/json;charset=utf-8,${encodeURIComponent(
            localStorage.getItem("collection")
          )}`}
          download="collections.json"
        >
          <GetAppIcon /> Export Collections
        </Button>
      </div>
      <div>
        <Button color="primary" variant="contained" component="label">
          <PublishIcon /> Import Collections
          <input type="file" onChange={importData} hidden />
        </Button>
      </div>
    </div>
  );
}

export default DataImportExport;
