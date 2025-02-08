import Swal from "sweetalert2";
import toast from "react-hot-toast";

const agregarAlCarrito = (producto, setCarritoStore) => {
  if (!producto || typeof setCarritoStore !== "function") {
    console.warn("Producto inválido o función incorrecta");

    return;
  }

  setCarritoStore((estadoActual) => {
    const existe = estadoActual.some((item) => item.id === producto.id);

    if (existe) {
      Swal.fire({
        icon: "question",
        title: "Este producto ya está en el carrito.",
        text: "¿Deseas agregar otra unidad?",
        showCancelButton: true,
        confirmButtonText: "Sí, agregar",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          setCarritoStore([...estadoActual, producto]);
          toast.success("Agregado correctamente");
          console.log("Se agregó otra unidad al carrito:", producto);
        }
      });

      return estadoActual;
    }
    const nuevoEstado = [...estadoActual, producto];
    console.log("Producto agregado al carrito:", producto);
    toast.success("Agregado correctamente");
    
    return nuevoEstado;
  });
};

export default agregarAlCarrito;
