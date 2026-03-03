const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);

// desativa loading screen
engine.loadingScreen = {
  displayLoadingUI: function () {},
  hideLoadingUI: function () {},
  loadingUIBackgroundColor: "",
  loadingUIText: ""
};

const scene = new BABYLON.Scene(engine);
scene.clearColor = new BABYLON.Color4(0.05, 0.07, 0.12, 1);

// câmera
const camera = new BABYLON.ArcRotateCamera(
  "camera",
  Math.PI / 2,
  Math.PI / 2.4,
  4,
  BABYLON.Vector3.Zero(),
  scene
);

camera.attachControl(canvas, true);
camera.lowerRadiusLimit = 4;
camera.upperRadiusLimit = 4;

// luz
new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

// drone
let drone;

BABYLON.SceneLoader.Append(
  "./models/",
  "drone.glb",
  scene,
  function (scene) {
    drone = scene.meshes[0];

    scene.meshes.forEach(mesh => {
      mesh.scaling = new BABYLON.Vector3(0.5, 0.5, 0.5);
    });
  }
);

// render loop
engine.runRenderLoop(() => {
  if (drone) {
    drone.rotation.y += 0.002;
  }
  scene.render();
});

// responsivo
window.addEventListener("resize", () => {
  engine.resize();
});