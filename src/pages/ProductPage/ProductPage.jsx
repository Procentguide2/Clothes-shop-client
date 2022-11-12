import { Box, Button, Modal, TextField, Typography, InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import { useState, useEffect } from "react";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import ProductTabs from "../../components/ProductTabs/ProductTabs";
import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { changeLoading, getFavoriten } from "../../redux/slices/appSlice";
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { URL } from "../../api/api";

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

const requestFetch = (url, method = 'GET', body = null) => {
  const headers = {
    'Content-Type': 'application/json'
  }

  return fetch(url, {
    method: method,
    headers: headers
  }).then(response => {
    return response.json()
  });
}


function ProductPage({ colorObj }) {
  const dispatch = useDispatch()
  const { isAdmin, userId, allColors, allCategories, token } = useSelector(state => state.app);
  const [rerender, setRerender] = useState(false);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openDelete, setOpenDelete] = useState(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);

  const [color, setColor] = useState('');
  const [size, setSize] = useState([]);
  const [category, setCategory] = useState('');
  const [photoPath, setPhotoPath] = useState('');
  const [title, setTitle] = useState('');
  const [descr, setDescr] = useState('');
  const [price, setPrice] = useState('');
  const [selectedGender, setSelectedGender] = useState('')

  const handleChangeColor = (event) => {
    setColor(event.target.value);
  };
  const handleChangeSize = (event) => {
    setSize(event.target.value);
  };
  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
  };

  const [productData, setProductData] = useState({})

  useEffect(() => {
    setColor(productData.colorId)
    setSize(productData?.size?.split(','))
    setCategory(productData.categoryId)
    // setPhotoPath(productData.img)
    setTitle(productData.title)
    setDescr(productData.description)
    setPrice(productData.price)
    setSelectedGender(productData.gender)
  }, [productData])

  const [searchParams, setSearchParams] = useSearchParams()
  const id = searchParams.get('id');
  const colorHex = searchParams.get('hex');
  const colorName = searchParams.get('color');
  const categoryItem = searchParams.get('category');

  useEffect(() => {
    dispatch(changeLoading(true))
    const url = `${URL}/product/${id}`;

    requestFetch(url)
      .then(data => {
        dispatch(changeLoading(false))
        // console.log(data)
        setProductData(data)
      })
      .catch(err => {
        dispatch(changeLoading(false))
        console.log(err);
      });
  }, [id, rerender])


  const navigate = useNavigate();

  const addToFavorite = async (e) => {
    if (userId === null) {
      navigate('/login')
    } else {
      await requestFetch(`${URL}/product/fav/?userId=${userId}&productId=${id}`, 'POST')
      dispatch(getFavoriten(userId))
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const body = {
      colorId: color,
      categoryId: category,
      title: title,
      price: +price,
      size: size.join(','),
      img: photoPath,
      description: descr,
      gender: selectedGender
    }

    console.log(body)

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token,
    }

    await fetch(`${URL}/product/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(body),
      headers: headers
    }).then(response => {
      handleClose()
      return response.json()
    });

    setRerender(prev => !prev)
  }

  const uploadImage = async (files) => {
    dispatch(changeLoading(true))
    const formData = new FormData();
    formData.append("file", files[0])
    formData.append("upload_preset", "qf1acott")

    await Axios.post('https://api.cloudinary.com/v1_1/malbo/image/upload', formData)
      .then(response => {
        setPhotoPath(response.data.url);
        dispatch(changeLoading(false))
      })
  }

  const onDelete = async () => {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token,
    }

    await fetch(`${URL}/product/${id}`, {
      method: 'DELETE',
      headers: headers
    }).then(response => {
      handleClose()
      return response.json()
    });

    navigate(`/`)
  }

  return (
    <main class="main">
      <Breadcrumbs title={'Product'} />

      <section class="product-page">
        <div class="container">
          <div class="product-one">
            <div class="product-one__inner">
              <div class="product-one__slide product-slide">
                <div class="product-slide__big">
                  <div class="product-slide__big-item">
                    <img src={productData?.img} alt="" />
                  </div>
                </div>
              </div>
              <div class="product-one__content">
                <h2 class="product-one__title">
                  {productData?.title}
                </h2>
                <div class="product-one__box">
                  <div class="product-one__price">
                    <div class="product-one__price-new">${productData?.price}</div>
                  </div>
                </div>
                <div style={{ marginTop: 40 }} class="product-one__item-form product-filter" action="#">
                  <div class="product-filter__color">
                    <div class="product-filter__color-title">Color:</div>
                    <label style={{ display: 'flex', alignItems: 'center' }}>
                      <span class="product-filter__color-chekbox">
                        <span style={{ backgroundColor: `#${colorHex}` }}></span>
                      </span>
                      <span style={{ marginLeft: 10 }}>{colorName}</span>
                    </label>
                  </div>
                  <div class="product-filter__size">
                    <div class="product-filter__size-title">Sizes:</div>
                    {productData?.size?.split(',').map(item => (
                      <label>
                        {/* <input class="product-filter__size-input" type="radio" name="size" /> */}
                        <span class="product-filter__size-chekbox">{item}</span>
                      </label>
                    ))}

                  </div>
                  <div class="product-one__item-info product-info">
                    <ul class="product-info__list">
                      <li class="product-info__item">
                        <div class="product-info__title">Art.no</div>
                        <div class="product-info__text">{productData?.id}</div>
                      </li>
                      <li class="product-info__item">
                        <div class="product-info__title">Category</div>
                        <div class="product-info__text">{categoryItem}</div>
                      </li>
                    </ul>
                  </div>

                  {isAdmin && <Button onClick={handleOpen} variant="contained" style={{ marginRight: 20 }}>Edit</Button>}

                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
                      <Typography id="modal-modal-title" variant="h6" component="h2">
                        Edit new product
                      </Typography>
                      <form name='edit-product' className="add-form" onSubmit={onSubmit}>
                        <TextField
                          fullWidth
                          label="Title"
                          variant="outlined"
                          value={title}
                          onChange={(e) => { setTitle(e.target.value) }}
                        />

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 40, }}>
                          <Button
                            variant="outlined"
                            component="label"
                            style={{ height: '100%', }}
                          >
                            Upload Photo
                            <input
                              name="image"
                              required
                              type="file"
                              accept="image/png, image/jpg, image/gif, image/jpeg"
                              onChange={(e) => { uploadImage(e.target.files) }}
                              hidden
                            />
                          </Button>
                          <input
                            readonly
                            // disabled
                            required
                            placeholder="Select some image"
                            title={photoPath}
                            style={{
                              maxWidth: 170,
                              overflow: 'hidden',
                              whiteSpace: 'nowrap',
                              textOverflow: 'ellipsis',
                              height: '100%',
                              borderColor: 'rgba(0, 0, 0, 0.23)',
                              borderRadius: 5,
                              padding: '0 10px',
                              outline: 'none'
                            }}
                            value={photoPath}
                          />
                        </div>
                        <TextField
                          fullWidth
                          label="Description"
                          variant="outlined"
                          value={descr}
                          onChange={(e) => { setDescr(e.target.value) }}
                        />
                        <TextField
                          fullWidth
                          label="Price"
                          variant="outlined"
                          value={price}
                          onChange={(e) => { setPrice(e.target.value) }}
                        />
                        <FormControl sx={{ m: 1, width: '100%', margin: 0 }} required>
                          <InputLabel id="select-color">Color</InputLabel>
                          <Select
                            labelId="select-color"
                            id="select-color"
                            value={color}
                            label="Color"
                            onChange={handleChangeColor}
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
                            {allColors?.map(item => (
                              <MenuItem value={item.id}>
                                <div className='option' style={{ display: 'flex', alignItems: 'center' }}>
                                  <div className='colorRect' style={{ background: item.hex }} />{item.name}
                                </div>
                              </MenuItem>
                            ))}

                          </Select>
                        </FormControl>

                        <FormControl fullWidth required>
                          <InputLabel id="select-size">Size</InputLabel>
                          <Select
                            multiple
                            labelId="select-size"
                            id="select-size"
                            value={size}
                            label="Size"
                            onChange={handleChangeSize}
                          >
                            <MenuItem value={'Xs'}>Xs</MenuItem>
                            <MenuItem value={'S'}>S</MenuItem>
                            <MenuItem value={'M'}>M</MenuItem>
                            <MenuItem value={'L'}>L</MenuItem>
                            <MenuItem value={'XL'}>XL</MenuItem>
                            <MenuItem value={'XXL'}>XXL</MenuItem>
                          </Select>
                        </FormControl>

                        <FormControl fullWidth required>
                          <InputLabel id="select-gender" >Gender</InputLabel>
                          <Select
                            labelId="select-gender"
                            id="select-gender"
                            value={selectedGender}
                            label="Gender"
                            onChange={(e) => setSelectedGender(e.target.value)}
                          >
                            <MenuItem value={'m'}>Man</MenuItem>
                            <MenuItem value={'w'}>Woman</MenuItem>
                          </Select>
                        </FormControl>

                        <FormControl fullWidth required>
                          <InputLabel id="select-category">Category</InputLabel>
                          <Select
                            labelId="select-category"
                            id="select-category"
                            value={category}
                            label="Category"
                            onChange={handleChangeCategory}
                          >
                            {allCategories.map(item => (
                              <MenuItem value={item.id}>{item.name}</MenuItem>
                            ))}
                          </Select>
                        </FormControl>

                        <Button variant="contained" type='submit'>Confirm</Button>
                      </form>
                    </Box>
                  </Modal>

                  {isAdmin && <Button onClick={handleOpenDelete} variant="outlined">Delete</Button>}

                  <Modal
                    open={openDelete}
                    onClose={handleCloseDelete}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
                      <div id="modal-modal-title" style={{ fontSize: 20, marginBottom: 40 }}>
                        Are you sure you want to delete {productData.title}?
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button variant="outlined" onClick={handleCloseDelete}>Cancel</Button>
                        <Button variant="contained" onClick={onDelete}>Delete</Button>
                      </div>

                    </Box>
                  </Modal>

                  <div style={{ marginTop: 175 }}>
                    {/* <InputAmount /> */}
                    <Button variant="contained" onClick={addToFavorite}>Add to favorite</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ marginBottom: 40 }}>
            <ProductTabs text={productData?.description} />
          </div>
        </div>
      </section>
    </main>
  );
}

export default ProductPage;