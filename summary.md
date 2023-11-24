# (main.tsx)

## const baseQuery = fetchBaseQuery

digunakan untuk membuat query dasar yang akan digunakan oleh semua endpoint API kita

## tagTypes: ['Movie', 'Series'],

ngasih tahu ke rtk query tags mana yang akan di invalidasi(cache) menggunakan invalidatesTags dan providesTags

## invalidatesTags

dipake dalam endpoint mutation untuk ngasih tau RTK Query kalo data Movie / Series mungkin telah berubah dan cache untuk data tersebut perlu diinvalidasi / diperbarui

## providesTags

dipake dalam endpoint query untuk ngasih tau RTK Query kalo query tersebut menyediakan data contoh :
kalo punya query untuk dapetin detail ‘Movie’, kita bisa gunain providesTags: ['Movie'] untuk ngasih tahu RTK Query kalo data ‘Movie’ tersebut sekarang ada di cache.

## contoh intermediate providesTags

providesTags: (result, error, arg) =>
if (result?.ids) {
return [
{ type: 'User', id: 'LIST' },
...result.ids.map(id => ({ type: 'User', id }))
]
} else return [{ type: 'User', id: 'LIST' }]
