<script>
import { mapGetters, mapActions } from 'vuex'

const INTERVAL_MS = 2000;

export default {
  mounted () {
    this.intervalForMessages = setInterval(() => {
      if (this.activeDialog) {
        this.dialogsMessages(this.activeDialog.id)
      }
    }, INTERVAL_MS)
  },
  computed: {
    ...mapGetters('profile/dialogs', ['activeDialog']),
  },
  methods: {
    ...mapActions('profile/dialogs', ['dialogsMessages']),
  },
  beforeDestroy () {
    window.clearInterval(this.intervalForMessages);
  },
  render: () => null,
}
</script>
