import React, { useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import LoadingScreen from "./components/LoadingScreen";
import { useNavigate, Link } from "react-router";
import ErrorBanner from "./components/ErrorBanner";
import escudo_unitropico_1 from "../assets/escudo_unitropico_1.png";

export function Signup() {
  let navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  const { signup } = useAuth();
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    signup(user.email, user.password)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        setError(error.message);
      });
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <section>
      {error && <ErrorBanner error={error} />}
      <div className="container h-full p-10">
        <div className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 light:text-neutral-200">
          <div className="w-full">
            <div className="block rounded-lg bg-white shadow-lg light:bg-neutral-800">
              <div className="g-0 lg:flex lg:flex-wrap">
                {/* <!-- Left column container--> */}
                <div className="px-4 md:px-0 lg:w-6/12">
                  <div className="md:mx-6 md:p-12">
                    {/* <!--Logo--> */}
                    <div className="text-center">
                      <img
                        className="mx-auto w-28"
                        src={escudo_unitropico_1}
                        alt="logo unitropico"
                      />
                      <h4 className="mb-12 mt-1 pb-1 text-xl font-bold">
                        Movilidad Estudiantil
                      </h4>
                    </div>

                    <form onSubmit={handleSubmit}>
                      <p className="mb-4">
                        Al crear tu cuenta, pon tu correo instutucional!!
                      </p>
                      {/* <!--Username input--> */}
                      <input
                        type="email"
                        name="email"
                        label="email"
                        className="w-full mb-4 rounded border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-(--green-color)"
                        placeholder="example@unitropico.edu.co"
                        onChange={handleChange}
                        required
                      />
                      {/* <!--Password input--> */}
                      <input
                        type="password"
                        name="password"
                        label="password"
                        className="w-full mb-4 rounded border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-(--green-color)"
                        placeholder="Contraseña"
                        onChange={handleChange}
                        required
                      />

                      {/* <!--Submit button--> */}
                      <div className="mb-12 pb-1 pt-1 text-center">
                        <button
                          className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                          type="submit"
                          style={{
                            background:
                              "linear-gradient(to left, #00594E,rgb(97, 124, 40), #B5A160)",
                          }}
                        >
                          Crear Cuenta
                        </button>
                      </div>

                      {/* <!--Register button--> */}
                      <div className="flex items-center justify-between pb-6">
                        <p className="mb-0 mr-2">Ya tienes cuenta?</p>
                        <Link
                          to="/login"
                          className="rounded border-2 border-(--gold-color) px-6 py-2 text-xs font-semibold uppercase text-(--gold-color) transition-colors duration-200 hover:bg-(--gold-color) hover:text-white"
                          
                        >
                          Inicia Sesion
                        </Link>
                      </div>
                    </form>
                  </div>
                </div>

                {/* <!-- Right column container with background and description--> */}
                <div
                  className="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none"
                  style={{
                    background:
                      "linear-gradient(to left, #00594E,rgb(97, 124, 40), #B5A160)",
                  }}
                >
                  <div className="px-4 py-6 text-white md:mx-6 md:p-12">
                    <h4 className="mb-4 text-xl font-semibold">
                      Política de Internacionalización
                    </h4>
                    <p className="text-sm">
                      La Internacionalización para Unitrópico, es un proceso que
                      brinda herramientas de formación holística, articulación
                      institucional e interinstitucional, adquiriendo una
                      perspectiva y dimensión intercultural para el desarrollo
                      de las actividades académicas, docentes, investigativas,
                      culturales y administrativas, lo que contribuye a mejorar
                      la calidad académica e institucional y fortalece los
                      vínculos locales, regionales, nacionales e
                      internacionales, logrando así, visibilizar y posicionar
                      estratégicamente a nuestra institución dentro y fuera del
                      país.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
