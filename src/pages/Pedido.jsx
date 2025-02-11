import React from "react";
import Navbar from "@/components/navbar/Navbar.jsx";
import { useForm } from "react-hook-form";
import { FaRegUser, FaPhone, FaTruck, FaCreditCard } from "react-icons/fa";
import useCarritoStore from "@/hooks/useCarritoStore";
import { calcularPrecioTotal } from "@/utils/calcularPrecioTotal.js";

function Pedido() {
  // const [telefono, setTelefono] = useState(
  //   localStorage.getItem("empresaActual")
  // );
  const carritoStore = useCarritoStore((state) => state.carritoStore);
  const total = calcularPrecioTotal(carritoStore);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const regexNum = /^\d{7,}$/;

  const onSubmit = async (data) => {
    // Validar que todos los campos estén presentes
    if (
      !data.nombre ||
      !data.telefono ||
      !data.delivery ||
      !data.pago ||
      !total
    ) {
      alert("Por favor, complete todos los campos.");
      return;
    }

    console.log(data);

    // Crear el mensaje con los datos del formulario
    const mensaje = `*Pedido de ${data.nombre}*%0A
    Teléfono: ${data.telefono}%0A
    Forma de Entrega: ${data.delivery}%0A
    Forma de Pago: ${data.pago}%0A
    Total: ${total}`;

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const telefono = "+5493813994145"; // Asegúrate de poner el número con el código de país

    const url = isMobile
      ? `https://api.whatsapp.com/send?phone=${telefono}&text=${mensaje}`
      : `https://web.whatsapp.com/send?phone=${telefono}&text=${mensaje}`;

    console.log(url);

    window.open(url, "_blank", "noopener noreferrer");
  };

  return (
    <div>
      <Navbar />

      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card shadow">
              <div className="card-body">
                <h2 className="card-title text-center mb-4">Tu Pedido</h2>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-3">
                    <label
                      className="form-label d-flex align-items-center gap-2"
                      htmlFor="nombre"
                    >
                      <FaRegUser size={18} />
                      Nombre y Apellido
                    </label>
                    <input
                      name="nombre"
                      id="nombre"
                      type="text"
                      className={`form-control ${
                        errors.nombre ? "is-invalid" : ""
                      }`}
                      {...register("nombre", {
                        required: "Este campo es requerido",
                        minLength: {
                          value: 3,
                          message:
                            "El nombre completo debe tener al menos 3 caracteres",
                        },
                      })}
                    />
                    {errors.nombre && (
                      <div className="invalid-feedback">
                        {errors.nombre.message}
                      </div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label
                      className="form-label d-flex align-items-center gap-2"
                      htmlFor="telefono"
                    >
                      <FaPhone size={18} />
                      Teléfono
                    </label>
                    <input
                      name="telefono"
                      id="telefono"
                      type="tel"
                      className={`form-control ${
                        errors.telefono ? "is-invalid" : ""
                      }`}
                      {...register("telefono", {
                        required: "Este campo es requerido",
                        pattern: {
                          value: regexNum,
                          message:
                            "Por favor ingrese un número de teléfono válido (mínimo 7 dígitos)",
                        },
                      })}
                    />
                    {errors.telefono && (
                      <div className="invalid-feedback">
                        {errors.telefono.message}
                      </div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label
                      className="form-label d-flex align-items-center gap-2"
                      htmlFor="delivery"
                    >
                      <FaTruck size={18} />
                      Forma de Entrega
                    </label>
                    <select
                      id="delivery"
                      name="delivery"
                      className={`form-select ${
                        errors.delivery ? "is-invalid" : ""
                      }`}
                      {...register("delivery", {
                        required: "Este campo es requerido",
                      })}
                    >
                      <option value="">Seleccione una opción</option>
                      <option value="Retiro en tienda">Retiro en tienda</option>
                      <option value="Delivery">Envío a domicilio</option>
                    </select>
                    {errors.delivery && (
                      <div className="invalid-feedback">
                        {errors.delivery.message}
                      </div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label
                      className="form-label d-flex align-items-center gap-2"
                      htmlFor="pago"
                    >
                      <FaCreditCard size={18} />
                      Forma de Pago
                    </label>
                    <select
                      id="pago"
                      name="pago"
                      className={`form-select ${
                        errors.pago ? "is-invalid" : ""
                      }`}
                      {...register("pago", {
                        required: "Este campo es requerido",
                      })}
                    >
                      <option value="">Seleccione una opción</option>
                      <option value="Efectivo">Efectivo</option>
                      <option value="Tarjeta">Tarjeta</option>
                      <option value="Transferencia">Transferencia</option>
                    </select>
                    {errors.pago && (
                      <div className="invalid-feedback">
                        {errors.pago.message}
                      </div>
                    )}
                  </div>
                  <div className="d-flex justify-content-between">
                    <h5>Total: {total}</h5>
                    <span className="fw-bold fs-5"></span>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary w-100"
                    // onClick={() => enviarPedido()}
                  >
                    Enviar
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pedido;
