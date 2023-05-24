# Wordress IES Julián Marías
# Manual de instalación

- Descarga en .tar.gz con la base de datos desde el siguiente enlace:
`https://drive.google.com/file/d/1BnEW2FSWa8tlqWw_qssrAY20sVZwcHz0/view?usp=share_link`
- Clona el repositorio
```sh
git clone https://github.com/daw223-11/daw223-11.git
```
- Descomprime el tar.gz dentro del repositorio, elimina antes la carpeta que ya existe llamada bbdd
```sh
mv bbddFinalVersion.tar.gz daw223-11
cd daw223-11
rm -fr bbdd
tar xvfz bbddFinalVersion.tar.gz
rm -fr bbddFinalVersion.tar.gz
```
- Usa los comandos de docker-compose
```sh
docker compose up -d
```

- En caso de errores posibles durante la instalación
Podría llegar a darse el caso de que le falten permisos, en caso tal coloque los permisos correspondiente
También puede darse el caso de que la Landing Page aparezca sin estilos. Si esto ocurre, dentro de las opciones del plugin Elementro existe una llamada herramientas. Si clicas en ella te aparecera la opción para regenearar el CSS y los medios del sitio web.
