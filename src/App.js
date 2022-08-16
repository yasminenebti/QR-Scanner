import React, { useState } from "react";
import { makeStyles, TextField, Button } from "@material-ui/core";
import QRCode from "qrcode";
import QrReader from "react-qr-reader";
import logo from "./bf.png";

function App() {
  const [text, setText] = useState("");
  const [text2, setText2] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [scanResultWebCam, setScanResultWebCam] = useState("");
  const classes = useStyles();

  var [txt] = useState("");
  var [txt2] = useState("");
  var [verif] = useState("");
  var crypto = require("crypto");

  const generateQrCode = async () => {
    try {
      txt2 = "\n" + " full name : " + text + " \n order id  : " + text2;

      var mykey = crypto.createCipher("aes-128-cbc", txt2);
      var mystr = mykey.update("abc", "utf8", "hex");
      mystr += mykey.final("hex");
      txt = txt2 + "\n code : " + mystr;

      console.log(mystr);
      const response = await QRCode.toDataURL(txt);
      setImageUrl(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleErrorWebCam = (error) => {
    console.log(error);
  };
  const handleScanWebCam = (result) => {
    if (result) {
      let string = result;
      const info = string.split(" ");
      let fullname = info[4];
      let blood = info[10];

      if (blood) {
        const b = blood.split("\n");
        const bl = b[0];

        let code = info[13];

        txt2 = "\n" + " full name : " + fullname + " \n order id  : " + bl;
        var mykey = crypto.createCipher("aes-128-cbc", txt2);
        var mystr = mykey.update("abc", "utf8", "hex");
        mystr += mykey.final("hex");
        if (mystr === code) {
          verif = "\n Thanks for trusting us for your scan";
        } else {
          verif = " \n Try our scanner";
        }

        setScanResultWebCam(txt2 + "\n" + verif);
      } else {
        verif = " \n consider using our scanner";
        setScanResultWebCam(result, verif);
      }
    }
  };

  function genr() {
    document.getElementById("ff").setAttribute("style", "display:none");

    document.getElementById("dd").removeAttribute("style");
    document.getElementById("d").removeAttribute("style");
  }

  function scn() {
    document.getElementById("dd").setAttribute("style", "display:none");
    document.getElementById("d").setAttribute("style", "display:none");

    document.getElementById("ff").removeAttribute("style");
  }

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div className={classes.navbar}>
        <img className={classes.img} src={logo} alt=""></img>
        <p onClick={genr} className={classes.el}>
          QR code scanner
        </p>
        <p onClick={scn} className={classes.el}>
          QR code generator
        </p>
      </div>
      <div className={classes.w} id="dd">
        <QrReader
          delay={300}
          onError={handleErrorWebCam}
          onScan={handleScanWebCam}
        />
      </div>

      <h3 id="d" className={classes.b}>
        Scan result: {scanResultWebCam}
      </h3>

      <div id="ff" style={{ display: "none" }}>
        <TextField
          label="full name"
          onChange={(e) => setText(e.target.value)}
        />
        <br />
        <TextField
          label="order id "
          onChange={(e) => setText2(e.target.value)}
        />
        <Button
          className={classes.btn}
          variant="contained"
          color="primary"
          onClick={() => generateQrCode()}
        >
          Generate
        </Button>
        <br />
        <br />
        <br />
        {imageUrl ? (
          <a href={imageUrl} download>
            <img
              style={{ width: "69%", marginLeft: "35px" }}
              src={imageUrl}
              alt="img"
            />
          </a>
        ) : null}
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  conatiner: {
    marginTop: 10,
  },
  title: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#3f51b5",
    color: "#fff",
    padding: 20,
  },
  btn: {
    marginTop: 10,
    marginBottom: 20,
  },
  r: {
    backgroundColor: "red",
    width: "500px",
    height: "100px",
  },
  img: {
    cursor: "pointer",
    width: "7%",
  },
  navbar: {
    display: "flex",
    width: "90%",
    alignItems: "center",
    marginTop: "10px",
  },
  el: {
    margin: "0 8%",
    color: "#1e7f9d",
    fontSize: "20px",
    fontWeight: "500",
    cursor: "pointer",
  },
  w: {
    width: "30%",
  },
  b: {
    color: "rgb(19, 80, 131)",
  },
}));
export default App;
