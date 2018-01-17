// Custom Components
import Editor from 'UI/Editor'
import ItemList from 'UI/ItemList'
import Modal from 'UI/Modal'

// Thirt-part Components
import Notification from 'vue-notification'

export default {
  install (Vue) {
    Vue.component('editor', Editor)
    Vue.component('item-list', ItemList)
    Vue.component('modal', Modal)
    Vue.component('notification', Notification)
  }
}
