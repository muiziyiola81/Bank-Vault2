self.addEventListener(
  "install",
  () => {
    self.skipWaiting();
  }
);


self.addEventListener(
  "activate",
  event => {

    event.waitUntil(
      self.clients.claim()
    );

  }
);


self.addEventListener(
  "push",
  event => {

    let data = {};


    try {

      data =
        event.data
          ? event.data.json()
          : {};

    } catch (error) {

      data = {

        title:
          "Bank Vault",

        body:
          event.data
            ? event.data.text()
            : "You have a new notification."

      };

    }


    const title =
      data.title ||
      "Bank Vault";


    const iconUrl =
      new URL(
        "images/bank-vault.png",
        self.registration.scope
      ).href;


    const notificationUrl =
      new URL(
        data.url ||
        "./",
        self.registration.scope
      ).href;


    const options = {

      body:
        data.body ||
        "You have a new notification.",

      icon:
        iconUrl,

      badge:
        iconUrl,

      data: {
        url:
          notificationUrl
      },

      vibrate:
        [200, 100, 200]

    };


    event.waitUntil(

      self.registration.showNotification(
        title,
        options
      )

    );

  }
);


self.addEventListener(
  "notificationclick",
  event => {

    event.notification.close();


    const notificationUrl =
      event.notification?.data?.url ||
      self.registration.scope;


    event.waitUntil(

      self.clients
        .matchAll({
          type: "window",
          includeUncontrolled: true
        })
        .then(
          clientList => {

            for (
              const client
              of clientList
            ) {

              if (
                "focus" in client
              ) {

                return client
                  .focus();

              }

            }


            if (
              self.clients.openWindow
            ) {

              return self.clients
                .openWindow(
                  notificationUrl
                );

            }

          }
        )

    );

  }
);