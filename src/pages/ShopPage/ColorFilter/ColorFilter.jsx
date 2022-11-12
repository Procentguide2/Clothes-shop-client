import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import AddIcon from '@mui/icons-material/Add';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import './ColorFilter.scss'
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { getAllColors } from '../../../redux/slices/appSlice';
import { URL } from '../../../api/api';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

function ColorFilter({ setColorFilter}) {
  const dispatch = useDispatch()

  const { isAdmin, allColors, token } = useSelector(state => state.app);
  const [message, setMessage] = React.useState('');
  const [color, setColor] = React.useState('');
  const [colorInput, setColorInput] = React.useState('#000000');
  const [colorName, setColorName] = React.useState('');

  React.useEffect(() => {
    setColorFilter(allColors.find(item => item.name === color)?.id)
  }, [color])

  const handleChange = (event) => {
    setColor(event.target.value);
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openDelete, setOpenDelete] = React.useState(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);

  const submitDelete = async () => {
    const headers = {
      // 'Content-Type': 'application/json',
      'Authorization': token,
    }

    await fetch(`${URL}/colors/${allColors.find(item => item.name === color)?.id}`, {
      method: 'DELETE',
      headers: headers
    }).then(response => {
      handleCloseDelete()
      return response.json()
    });

    dispatch(getAllColors())
  }

  const onSubmit = async () => {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token,
    }

    const body = {
      name: colorName,
      hex: colorInput
    }

    const res = await fetch(`${URL}/color`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: headers
    }).then(response => {
      if (response.ok) {
        handleClose()
      }

      return response.json()
    });

    if (res.message) {
      setMessage(res.message)
    } else {
      setMessage('')
    }

    dispatch(getAllColors())
  }

  return (
    <div className="filter__item filter-color">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <h3 className="filter__title">Color Filter</h3>
        {isAdmin && <AddIcon onClick={handleOpen} style={{ color: '#fff', background: '#1976d2', borderRadius: 5, cursor: 'pointer' }} />}
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <form onSubmit={(e) => { e.preventDefault(); onSubmit() }}>
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Add new color
            </Typography>
            <div className='color-pallete'>
              <input value={colorInput} onInput={(e) => setColorInput(e.target.value)} type='color' required />
              <ArrowForwardIosIcon />
              <div>{colorInput}</div>
            </div>

            <TextField
              required
              fullWidth
              style={{ marginBottom: 30 }}
              label="Color Name"
              variant='outlined'
              onInput={(e) => setColorName(e.target.value)}
            />

            <Button variant="contained" type='submit' style={{ marginRight: 20 }}>Confirm</Button>
            {message && <span style={{ color: '#d32f2f' }}>{message}!</span>}
          </Box>
        </form>
      </Modal>

      <Modal
        open={openDelete}
        onClose={handleCloseDelete}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div id="modal-modal-title" style={{ fontSize: 20, marginBottom: 40 }}>
            Are you sure you want to delete {color} color?
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="outlined" onClick={handleCloseDelete}>Cancel</Button>
            <Button variant="contained" onClick={submitDelete}>Delete</Button>
          </div>

        </Box>
      </Modal>

      <FormControl sx={{ m: 1, minWidth: 300, margin: 0 }} >
        <InputLabel id="demo-select-small">Color</InputLabel>
        <Select
          labelId="demo-select-small"
          id="demo-select-small"
          value={color}
          label="Color"
          onChange={handleChange}
          MenuProps={
            {
              PaperProps: {
                style: {
                  maxHeight: 200,
                  width: 200,
                },
              },
            }
          }
        >
          <MenuItem value=''>
            <em>None</em>
          </MenuItem>
          {allColors?.map(item => (
            <MenuItem value={item.name}>
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <div className='option' style={{ display: 'flex', alignItems: 'center' }}>
                  <div className='colorRect' style={{ background: item.hex }} />{item.name}
                </div>

                {isAdmin && <DeleteOutlineIcon onClick={handleOpenDelete} style={{ color: '#d32f2f', borderRadius: 5, cursor: 'pointer' }} />}
              </div>

            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default ColorFilter;