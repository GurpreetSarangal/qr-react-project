import { Component } from 'react';
import Scanner from './Scanner';
import { Fab, TextareaAutosize, Paper, Button } from '@mui/material';
import { ArrowBack } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { Exception } from '@zxing/library';

class BarcodeScanner extends Component {
  state = {
    results: [],
    scanning: false,
    latestCode: '',
    modalVisible: false,
  };

  _scan = () => {
    this.setState({ scanning: !this.state.scanning });
  };

  _onDetected = (result) => {
    try {
      // console.log(result && result.codeResult && result.codeResult.code);
      const code = result?.codeResult?.code;
      if (code) {
        this.setState(() => ({
          // results: [...prevState.results, result],
          scanning: false,
          latestCode: code,
          modalVisible: true,
        }));
        console.log(this.state.results)
      }

    } catch (e) {
      console.log(e);
    }
  };

  render() {
    return (
      <div>
        <Link to="/">
          <Fab style={{ marginRight: 10 }} color="secondary">
            <ArrowBack />
          </Fab>
        </Link>
        <span>Barcode Scanner</span>

        <Paper variant="outlined" style={{ marginTop: 30, width: 640, height: 320 }}>
          <Scanner onDetected={this._onDetected} />
        </Paper>

        <textarea
          style={{ fontSize: 32, width: 320, height: 100, marginTop: 30 }}
          rows={3}
          value={this.state.latestCode || 'No data scanned'}
          readOnly
        />

        <textarea
          style={{ fontSize: 32, width: 320, height: 100, marginTop: 30 }}
          rows={3}
          value={String(this.state.modalVisible)}
          readOnly
        />

        <Button variant="text" onClick={() => {
          try {
            if (!this.state.results.some(r => r.codeResult.code === this.state.latestCode)) {
              this.setState((prevState) => ({
                results: [...prevState.results, this.state.latestCode],
              }));

            }
            else {
              // console.log("not saved" + this.state.latestCode)
              throw new Exception("not saved" + this.state.latestCode)
            }

          }
          catch (e) {
            console.log(e.message)
          }

        }} >Save</Button>

      </div>
    );
  }
}

export default BarcodeScanner;