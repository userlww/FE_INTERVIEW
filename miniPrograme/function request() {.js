function request() {
  return new Promise((resolve) =>{
    ajax({
      url:'aaaa',
      success: function(res) {
        resolve(res)
      }
    })
  })
}

await request()
