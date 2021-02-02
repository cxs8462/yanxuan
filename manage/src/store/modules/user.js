import { login, state as getState } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = (name, avatar) => {
  return {
    token: getToken(),
    name,
    avatar
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state, { username, avatar }) => {
    Object.assign(state, getDefaultState(username, avatar))
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    return new Promise(resolve => {
      login(userInfo).then(r => {
        if (!r.errno) {
          const { token, userInfo: { username, avatar }} = r.data
          setToken(token)
          commit('SET_TOKEN', token)
          commit('SET_NAME', username)
          commit('SET_AVATAR', avatar)
        }
        resolve()
      })
    })
  },
  logout() {
    removeToken()
    resetRouter()
  },
  async getInfo({ commit }) {
    const data = await getState()
    const { username, avatar } = data.data
    commit('RESET_STATE', { username, avatar })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

