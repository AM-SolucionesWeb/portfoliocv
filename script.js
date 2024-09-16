/* Menu */
((d) => {
   const $btnMenu = d.querySelector(".menu-btn"),
      $menu = d.querySelector(".menu")

   $btnMenu.addEventListener("click", (e) => {
      $btnMenu.firstElementChild.classList.toggle("none");
      $btnMenu.lastElementChild.classList.toggle("none");
      $menu.classList.toggle("is-active");
   });

   d.addEventListener("click", e => {
      if (!e.target.matches(".menu a")) return false;

      $btnMenu.firstElementChild.classList.remove("none");
      $btnMenu.lastElementChild.classList.add("none");
      $menu.classList.remove("is-active");
   })
})(document);

/*    ContactForm       */

((d) => {
   const $form = d.querySelector(".contact-form"),
         $loader = d.querySelector(".contact-form-loader"),
         $response = d.querySelector(".contact-form-response");

   $form.addEventListener("submit", (e) => {
      e.preventDefault();
      $loader.classList.remove("none");

      const serviceID = 'service_vedc6bw';
      const templateID = 'template_zbaeqx1';
      const userID = 'VRpn3E_3VKSTYBneL';

      // Recolecta los datos del formulario
      const formData = new FormData(e.target);
      const templateParams = Object.fromEntries(formData);

      console.log("Datos del formulario:", templateParams);

      fetch("https://api.emailjs.com/api/v1.0/email/send", {
         method: "POST",
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({
            service_id: serviceID,
            template_id: templateID,
            user_id: userID,
            template_params: templateParams,
         }),
      })
      .then((res) => res.text()) // Lee la respuesta como texto
      .then((text) => {
         console.log("Respuesta del servidor:", text);
         if (text.includes("OK")) {
            $response.querySelector("h3").textContent
            $response.querySelector("svg.triste").remove();
            $response.querySelector("svg").classList = 'feliz';
            $form.reset();
            location.hash = "#gracias";
         } else {
            // Maneja el caso cuando el texto no incluye "OK"
            location.hash = "#gracias";
            $response.querySelector("h3").textContent = "El mensaje NO se envió correctamente";
            $response.querySelector("svg.feliz").remove();
            $response.querySelector("svg").classList = 'triste';
         }
      })
      .catch((err) => {
         console.error("Error al enviar el mensaje:", err);
         location.hash = "#gracias";
         $response.querySelector("h3").textContent = "Ocurrió un error al enviar, intenta nuevamente";
         $response.querySelector("svg.feliz").remove();
         $response.querySelector("svg").classList = 'triste';
      })
      .finally(() => {
         $loader.classList.add("none");
         setTimeout(() => {
            location.hash = "#close";
         }, 3000);
      });
   });
})(document);