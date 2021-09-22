export default {
    methods: {
      toaster(icon, message) {
        const Toast = this.$swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', this.$swal.stopTimer)
            toast.addEventListener('mouseleave', this.$swal.resumeTimer)
          },
        })
        
        Toast.fire({
          icon: icon,
          title: message,
        })
      },
    },
  }