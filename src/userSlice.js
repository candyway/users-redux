import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const api =
  'https://file.notion.so/f/s/b697dfd0-4a6f-4555-bd14-60559f2a8179/users.json?id=cc13eeae-fbeb-4b40-9b71-228fe193a8f6&table=block&spaceId=a73b0a18-75ee-4904-8f1e-0681ca27036a&expirationTimestamp=1687868239001&signature=-hzA6M8ay2D58Xzie9GCp3PCCd4-tiWHxmVsfr-kcZo&downloadName=users.json';

const initialState = {
  users: [],
  loading: false,
  error: null,
}

export const getUsers = createAsyncThunk('getUsers', async () => {
  try {
    const response = await axios.get(api);
    return response.data;
  } catch (error) {
    throw error;
  }
})

export const deleteUser = createAsyncThunk('deleteUser', async (userEmail) => {
  try {
    return userEmail
  } catch (error) {
    throw error;
  }
})

export const addUser = createAsyncThunk('addUser', async (userData) => {
  try {
    return userData
  } catch (error) {
    throw error;
  }
})

export const editUser = createAsyncThunk('editUser', async (userData) => {
    try {
      return userData
    } catch (error) {
      throw error;
    }
  })

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter(
          (user) => user.email !== action.payload
        );
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
      })
      .addCase(addUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(editUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.loading = false;
        const updatedUser = action.payload;
        const updatedUsers = state.users.map((user) => {
          if (user.email === updatedUser.email) {
            return { ...user, ...updatedUser };
          }
          return user;
        });
        state.users = updatedUsers;
      })
      .addCase(editUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const selectUsers = (state) => state.users.users;
export const selectLoading = (state) => state.users.loading;
export const selectError = (state) => state.users.error;

export default userSlice.reducer;
