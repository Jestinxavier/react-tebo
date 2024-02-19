import sum from "lodash/sum";
import uniq from "lodash/uniq";
import uniqBy from "lodash/uniqBy";
import { createSlice } from "@reduxjs/toolkit";
import {
  formatDateToYYYYMMDD,
  formatDateTohmms,
} from "../../utils/momentformat";
// utils
import axios from "../../utils/axios";
import { ADMIN } from "../../config-global";

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  products: [],
  robots: [],
  calllogs: [],
  listTicket: [],
  sharedRobot: [],
  singleRobot: [],
  product: null,
  shareRobotList: [],
  callAnalytics: null,
  totalAnalytics: null,
  takeAtour: false,
  speedControl: 1,
muteMic: true,
  checkout: {
    activeStep: 0,
    cart: [],
    subtotal: 0,
    total: 0,
    discount: 0,
    shipping: 0,
    billing: null,
    totalItems: 0,
  },
};

const slice = createSlice({
  name: "robot",
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET PRODUCTS
    getProductsSuccess(state, action) {
      state.isLoading = false;
      state.products = action.payload;
    },

    setTour(state, action) {
      state.isLoading = false;
      state.takeAtour = action.payload;
    },
    setSpeed(state, action) {
      state.isLoading = false;
      state.speedControl = action.payload;
    },

    getRobotList(state, action) {
      state.isLoading = false;
      state.robots = action.payload;
    },

    setCallLogs(state, action) {
      state.isLoading = false;
      state.calllogs = action.payload;
    },

    setTicket(state, action) {
      state.isLoading = false;
      state.listTicket = action.payload;
    },
    setCallAnalytics(state, action) {
      state.isLoading = false;
      state.callAnalytics = action.payload;
    },
    setTotalAnalytics(state, action) {
      state.totalAnalytics = action.payload;
    },
    geSingletRobot(state, action) {
      state.isLoading = false;
      state.singleRobot = action.payload;
    },

    // get SharedRobot

    getSharedRobot(state, action) {
      state.isLoading = false;
      state.sharedRobot = action.payload;
    },
    // Set PRODUCT
    setSharedToRobotList(state, action) {
      state.isLoading = false;
      state.shareRobotList = action.payload;
    },
    // GET PRODUCT
    getProductSuccess(state, action) {
      state.isLoading = false;
      state.product = action.payload;
    },

    // CHECKOUT
    getCart(state, action) {
      const cart = action.payload;

      const totalItems = sum(cart.map((product) => product.quantity));
      const subtotal = sum(
        cart.map((product) => product.price * product.quantity)
      );
      state.checkout.cart = cart;
      state.checkout.discount = state.checkout.discount || 0;
      state.checkout.shipping = state.checkout.shipping || 0;
      state.checkout.billing = state.checkout.billing || null;
      state.checkout.subtotal = subtotal;
      state.checkout.total = subtotal - state.checkout.discount;
      state.checkout.totalItems = totalItems;
    },

    addToCart(state, action) {
      const newProduct = action.payload;
      const isEmptyCart = !state.checkout.cart.length;

      if (isEmptyCart) {
        state.checkout.cart = [...state.checkout.cart, newProduct];
      } else {
        state.checkout.cart = state.checkout.cart.map((product) => {
          const isExisted = product.id === newProduct.id;

          if (isExisted) {
            return {
              ...product,
              colors: uniq([...product.colors, ...newProduct.colors]),
              quantity: product.quantity + 1,
            };
          }

          return product;
        });
      }
      state.checkout.cart = uniqBy([...state.checkout.cart, newProduct], "id");
      state.checkout.totalItems = sum(
        state.checkout.cart.map((product) => product.quantity)
      );
    },

    deleteCart(state, action) {
      const updateCart = state.checkout.cart.filter(
        (product) => product.id !== action.payload
      );

      state.checkout.cart = updateCart;
    },

    resetCart(state) {
      state.checkout.cart = [];
      state.checkout.billing = null;
      state.checkout.activeStep = 0;
      state.checkout.total = 0;
      state.checkout.subtotal = 0;
      state.checkout.discount = 0;
      state.checkout.shipping = 0;
      state.checkout.totalItems = 0;
    },

    backStep(state) {
      state.checkout.activeStep -= 1;
    },

    nextStep(state) {
      state.checkout.activeStep += 1;
    },

    gotoStep(state, action) {
      const step = action.payload;
      state.checkout.activeStep = step;
    },
muteToggle(state, action) {
      state.muteMic = !state.muteMic;
    },
    increaseQuantity(state, action) {
      const productId = action.payload;

      const updateCart = state.checkout.cart.map((product) => {
        if (product.id === productId) {
          return {
            ...product,
            quantity: product.quantity + 1,
          };
        }
        return product;
      });

      state.checkout.cart = updateCart;
    },

    decreaseQuantity(state, action) {
      const productId = action.payload;
      const updateCart = state.checkout.cart.map((product) => {
        if (product.id === productId) {
          return {
            ...product,
            quantity: product.quantity - 1,
          };
        }
        return product;
      });

      state.checkout.cart = updateCart;
    },

    createBilling(state, action) {
      state.checkout.billing = action.payload;
    },

    applyDiscount(state, action) {
      const discount = action.payload;
      state.checkout.discount = discount;
      state.checkout.total = state.checkout.subtotal - discount;
    },

    applyShipping(state, action) {
      const shipping = action.payload;
      state.checkout.shipping = shipping;
      state.checkout.total =
        state.checkout.subtotal - state.checkout.discount + shipping;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const {
  getCart,
muteToggle,
  addToCart,
  resetCart,
  gotoStep,
  backStep,
  nextStep,
  deleteCart,
  createBilling,
  applyShipping,
  applyDiscount,
  increaseQuantity,
  decreaseQuantity,
} = slice.actions;

// ----------------------------------------------------------------------

export function getProducts() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post("/owner/my-robots");
      dispatch(slice.actions.getProductsSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getSingleRobot(data) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post("/owner/show-robot", {
        owned_robot_id: 2,
      });
      dispatch(slice.actions.geSingletRobot(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getSharedRobotList(data) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post("/owner/others-shared-with-me");
      dispatch(slice.actions.getSharedRobot(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export function getRobot() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post("/owner/my-robots");
      if (response) {
        dispatch(slice.actions.getRobotList(response.data.data));
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getProduct(name) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get("/api/products/product", {
        params: { name },
      });
      dispatch(slice.actions.getProductSuccess(response.data.product));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getCallLogs() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post("/owner/all-call-logs");
      if (response) {
        let result = response?.data?.data?.logs?.map((res) => ({
          ...res,
          uuid: res.robot?.uuid,
          nickname: res?.robot?.owned_robot[0]?.nickname,
          owner: response?.data?.data?.owner?.name,
          startDate: formatDateToYYYYMMDD(res?.local_time?.local_end),
          startTime: formatDateTohmms(res?.local_time?.local_start),
          endTime: formatDateTohmms(res?.local_time?.local_end),
          usedUserName: res.used_by_shared_owner
            ? res.accepted_owner.name
            : response?.data?.data?.owner?.name,
          used_by_shared_owner: res.used_by_shared_owner,
          //  session_start
        }));

        console.log(result, "response.data.data");

        if (result) {
          dispatch(slice.actions.setCallLogs([...result]));
        }
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getSharedToRobot() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post("/owner/my-robots");
      if (response) {
        const result = response?.data?.data?.robots;
        console.log(result, "smily **");

        if (result) {
          // Debugging logs
          console.log("Destructuring data...");
          const destructuredResult = result
            ?.map((item) =>
              item.robot.sharing_with?.map((res) => ({
                ...res,
                robotName: item.nickname || "",
                location_name: item.location_name,
                email: res.sharing_owner?.email || "",
                name: res.sharing_owner?.name || "",
                phone: res.sharing_owner?.phone || "",
              }))
            )
            .flat()
            .filter((item) => item !== null);
          console.log(destructuredResult, "DestructuredResult**");

          if (destructuredResult) {
            // Debugging log
            console.log("Dispatching data to Redux...");
            dispatch(slice.actions.setSharedToRobotList(destructuredResult));
          }
        } else {
          console.log("Invalid or empty result array.");
        }
      }
    } catch (error) {
      // Debugging log for error
      console.error("Error:", error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getTicket() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post(
        ADMIN ? "/admin/list-all-tickets" : "/owner/list-ticket"
      );
      if (response) {
        dispatch(slice.actions.setTicket(response.data.data));
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getCallAnalytics() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post("/owner/call-analytics");
      if (response) {
        let totalAnalytics = response?.data?.data;
        let filterAnalyticData =
          response?.data?.data?.calls_count_to_robots.map(
            (item, index) => item.count
          );
        let xaxisData = response?.data?.data?.calls_count_to_robots.map(
          (item, index) => item?.robot?.nickname
        );
        dispatch(
          slice.actions.setCallAnalytics({ filterAnalyticData, xaxisData })
        );
        dispatch(slice.actions.setTotalAnalytics(totalAnalytics))
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function TourController(data) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      dispatch(slice.actions.setTour(data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function postTourController() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post("/owner/call-analytics");
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function postSpeed(data) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      dispatch(slice.actions.setSpeed(data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function muteFunctionality() {
  return async (dispatch) => {
    dispatch(slice.actions.muteToggle());
  };
}
