<template>
  <div id="app">
    <expandable-image
      class="image"
      :src="require('./test.jpg')"
      alt="dog"
      title="dog"
      :close-on-background-click="true"
    />
    <expandable-image
      class="image"
      src="https://images.unsplash.com/photo-1551033453-3d94e6c88561?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2468&q=80"
    />
  </div>
</template>

<script>
export default {
  mounted () {
    const viewportMeta = document.createElement('meta')
    viewportMeta.name = 'viewport'
    viewportMeta.content = 'width=device-width, initial-scale=1'
    document.head.appendChild(viewportMeta)
  }
}
</script>

<style>
#app {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 600px;
  max-width: 100%;
  margin: 50px auto;
  position: relative;
}

.image {
  width: 400px;
  max-width: 100%;
}
</style>
