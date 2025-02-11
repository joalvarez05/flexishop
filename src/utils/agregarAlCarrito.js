import Swal from "sweetalert2";
import toast from "react-hot-toast";
import useCarritoStore from "@/hooks/useCarritoStore"; // Importa el store directamente

const agregarAlCarrito = (producto) => {
  if (!producto) {
    console.warn("Producto inválido");
    return;
  }

  const { carritoStore, setCarritoStore } = useCarritoStore.getState(); // Obtenemos el estado actual

  const tiempoActual = Date.now();

  // Actualizamos la fecha de agregado de todos los productos en el carrito
  const nuevoCarrito = carritoStore.map((item) => ({
    ...item,
    fechaDeAgregado: tiempoActual,
  }));

  const existe = nuevoCarrito.some((item) => item.id === producto.id);

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
        const carritoActualizado = nuevoCarrito.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );

        setCarritoStore(carritoActualizado);
        toast.success("Agregado correctamente");
      }
    });

    return;
  }

  // Si es un nuevo producto, lo agregamos al carrito
  const carritoActualizado = [
    ...nuevoCarrito,
    { ...producto, cantidad: 1, fechaDeAgregado: tiempoActual },
  ];

  setCarritoStore(carritoActualizado);
  toast.success("Agregado correctamente");
};

export default agregarAlCarrito;
