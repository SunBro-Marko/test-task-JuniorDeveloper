<template>
  <div id="app">
    <notifications group="foo" />
    <yandex-map ymap-class="YMap" :coords="coords" :zoom="10" @click="onClick" @map-was-initialized="myShit"> </yandex-map> 
  </div>
</template>

<script>
function createPlacemark(coords) {
  return new ymaps.Placemark(
    coords,
    {
      iconCaption: 'поиск...',
    },
    {
      preset: 'islands#violetDotIconWithCaption',
      draggable: true,
    }
  )
}

function getAddress(coords, mark, notify) {
  mark.properties.set('iconCaption', 'поиск...')
  ymaps.geocode(coords).then(function(res) {
    var firstGeoObject = res.geoObjects.get(0)

    mark.properties.set({
      iconCaption: [
        firstGeoObject.getLocalities().length ? firstGeoObject.getLocalities() : firstGeoObject.getAdministrativeAreas(),
        firstGeoObject.getThoroughfare() || firstGeoObject.getPremise(),
      ]
        .filter(Boolean)
        .join(', '),
      balloonContent: firstGeoObject.getAddressLine(),
    })
    notify({
        group: 'foo',
        title: 'Яндекс.Карты',
        text: mark.properties._data.balloonContent,
      })
  })
}

export default {
  data: () => ({
    coords: [55.79791700287277, 37.964356701284],
    mark: '',
    myMap: '',
  }),
  methods: {
    onClick(e) {
      this.coords = e.get('coords')
      
      if (this.mark) {
        this.mark.geometry.setCoordinates(this.coords)
      } else {
        this.mark = createPlacemark(this.coords)
        this.myMap.geoObjects.add(this.mark)
        this.mark.events.add('dragend', function() {
          getAddress(this.mark.geometry.getCoordinates(),mark,this.$notify)
        })
      }

      getAddress(this.coords, this.mark,this.$notify)
    },
    myShit(e) {
      this.myMap = e
    },
  },
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
#app {
  display: grid;
  grid-template-rows: 1fr;
  min-height: 100vh;
}
.YMap {
  width: 100%;
  height: 100%;
}
</style>
