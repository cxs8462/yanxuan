import address from './adressData.json'

const data = {
  province_list:{},
  city_list:{},
  county_list:{}
}

address.forEach(r=>{
  data.province_list[r.value+'0000'] = r.label
  r.children.forEach(s=>{
    data.city_list[s.value+'00'] = s.label
    s.children.forEach(z=>{
      data.county_list[z.value] = z.label
    })
  })
})


export default data
