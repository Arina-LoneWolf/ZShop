# ZSHOP

ZShop is an e-commerce website that sells gift and fashion products.

## Feature
* Filter and search products by product category, name, status.
* Comment to review products.
* Ban user to write comments.
* Order and checkout products.
* Manage personal information.
* Track orders.
* Manage slideshow banners (admin).
* Manage all products and orders (admin).
* View product statistics (admin).


## Technology
* Docker for containerized web application.
* JWT for authorization.
* React Hook Form and Yup for building forms.
* HTML5/CSS3 and ReactJS library for front-end.
* RecoilJS library for global state management.
* NodeJS/Express for back-end.
* MySQL for database.


## Screenshots
<img src="https://res.cloudinary.com/dccqahm52/image/upload/v1643222789/ZShop/home_ovcxvk.png" width="400" />
<img src="https://res.cloudinary.com/dccqahm52/image/upload/v1643223764/ZShop/detail_u2xnff.png" width="400" />
<img src="https://res.cloudinary.com/dccqahm52/image/upload/v1643224181/ZShop/checkout_lx35wu.png" width="400" />
<img src="https://res.cloudinary.com/dccqahm52/image/upload/v1643224372/ZShop/statistics_avpis2.png" width="400" />
<img src="https://res.cloudinary.com/dccqahm52/image/upload/v1643224494/ZShop/manage-product_xqhuzj.png" width="400" />


## Prerequisites

Before you continue, ensure you meet the following requirements:
* You have installed Docker.
* You have installed NodeJS.

## Install
Add some necessary files to the project according to the instructions below:
* Add a file named .env to top of the project and paste the following code:
```bash
  NODE_LOCAL_PORT=<YOUR_PORT>
  NODE_DOCKER_PORT=<YOUR_PORT>
```
* Add a file named `.env` to `client` folder and paste the following code:
```bash
  REACT_APP_API_URL=<YOUR_PORT>
  REACT_APP_FACEBOOK_PAGE_ID=<YOUR_FACEBOOK_PAGE_ID>
  REACT_APP_FACEBOOK_APP_ID=<YOUR_FACEBOOK_APP_ID>
  REACT_APP_GOOGLE_CLIENT_ID=<YOUR_GOOGLE_CLIENT_ID>
```
* Add a file named `.env` to `server` folder and paste the following code:
```bash
  NODE_LOCAL_PORT=<YOUR_PORT>
  NODE_DOCKER_PORT=<YOUR_PORT>
  USERNAME_GMAIL=<YOUR_EMAIL_USERNAME>
  PASS_GMAIL=<YOUR_EMAIL_PASSWORD>
  ACCESS_TOKEN_SECRET=<YOUR_SECRET_KEY>
  CLIENT_ID=<YOUR_GOOGLE_CLIENT_ID>
  CLIENT_SECRET=<YOUR_GOOGLE_SECRET_KEY>
  REDIRECT_URI=<YOUR_APP_URI>
  REFRESH_TOKEN_MAIL=<YOUR_GOOGLE_REFRESH_TOKEN_MAIL>
  CLOUD_NAME=<YOUR_CLOUDINARY_NAME>
  CLOUD_KEY=<YOUR_CLOUDINARY_KEY>
  CLOUD_SECRET=<YOUR_CLOUDINARY_SECRET_KEY>
  OAUTH_GOOGLE_CLIENT=<YOUR_OAUTH_GOOGLE_CLIENT_ID>
```


## Usage

```bash
  docker-compose up -d
```


## Authors

- [@arina](https://github.com/Arina-LoneWolf)
- [@minhnhatkool](https://github.com/minhnhatkool123)
