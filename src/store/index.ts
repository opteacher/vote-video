import api from '@/api'
import { createStore } from 'vuex'

type RootState = {
  ip: string
  votable: boolean
}

export default createStore({
  state: {
    ip: '',
    votable: false
  },
  mutations: {
    setState: (state: RootState, payload: any) => {
      state.ip = payload.ip
      state.votable = payload.votable
    }
  },
  actions: {
    async refresh(context) {
      context.commit('setState', await api.client())
    }
  },
  modules: {}
})
