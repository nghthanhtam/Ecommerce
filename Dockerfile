FROM node:alpine as builder

# set the working dir for container
WORKDIR /frontend

# copy the json file first
COPY ./package.json /frontend

# install npm dependencies
RUN yarn install

ARG REACT_APP_BACKEND_EMPLOYEE
ENV REACT_APP_BACKEND_EMPLOYEE=$REACT_APP_BACKEND_EMPLOYEE
ARG REACT_APP_BACKEND_ADMIN
ENV REACT_APP_BACKEND_ADMIN=$REACT_APP_BACKEND_ADMIN
ARG REACT_APP_BACKEND_PRODUCT
ENV REACT_APP_BACKEND_PRODUCT=$REACT_APP_BACKEND_PRODUCT
ARG REACT_APP_BACKEND_USER
ENV REACT_APP_BACKEND_USER=$REACT_APP_BACKEND_USER
ARG REACT_APP_BACKEND_ORDER
ENV REACT_APP_BACKEND_ORDER=$REACT_APP_BACKEND_ORDER
ARG REACT_APP_BACKEND_RATING
ENV REACT_APP_BACKEND_RATING=$REACT_APP_BACKEND_RATING
ARG REACT_APP_BACKEND_LOGGING
ENV REACT_APP_BACKEND_LOGGING=$REACT_APP_BACKEND_LOGGING
ARG REACT_APP_BACKEND_PROMOTION
ENV REACT_APP_BACKEND_LOGGING=$REACT_APP_BACKEND_PROMOTION

# copy other project files
COPY . .

# build the folder
RUN yarn run build

# Handle Nginx
FROM nginx
COPY --from=builder /frontend/build /usr/share/nginx/html
COPY ./docker/nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80