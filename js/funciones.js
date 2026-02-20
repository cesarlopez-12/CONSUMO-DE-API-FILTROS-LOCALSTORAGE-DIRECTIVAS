const app = Vue.createApp({

    created(){
        this.cargar();
    },

    data(){
        return{
            articulos:[],
            busqueda:"",
            articuloSeleccionado:null
        }
    },

    computed:{

        articulosFiltrados(){
            return this.articulos.filter(a =>
                a.title.toLowerCase()
                .includes(this.busqueda.toLowerCase())
            )
        },

        porcentaje(){
            if(this.articulos.length===0) return 0
            return (this.articulosFiltrados.length*100)/this.articulos.length
        }

    },

    methods:{

        cargar(){
            axios.get("https://api.spaceflightnewsapi.net/v4/articles/")
            .then(res=>{
                this.articulos = res.data.results
            })
        },

        verDetalle(a){
            this.articuloSeleccionado = a
        },

        eliminar(id){
            this.articulos = this.articulos.filter(a=>a.id!==id)
        }

    }

});

app.mount("#contenedor");