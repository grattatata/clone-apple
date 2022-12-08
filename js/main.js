(() => {
  let yOFFset = 0; //window.pageYOffset 대신 쓸 변수
  let prevScrollHeight = 0; //현재 스크롤 위치(yOffset)보다 이전에 위치한 스크롤 높이값의 합
  let currentScene = 0; //현재 활성화된 (눈앞에 보고 있는 scene 또는 씬(scroll-section))

  const sceneInfo = [
    {
      // 0
      type: "sticky",
      heightNum: 5, //브라우저 높이의 5배로 scrollHeight 세팅
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-0"),
      },
    },
    {
      // 1
      type: "normal",
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-1"),
      },
    },
    {
      // 2
      type: "sticky",
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-2"),
      },
    },
    {
      // 3
      type: "sticky",
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-3"),
      },
    },
  ];

  function setLayout() {
    //각 스크롤 높이 셋팅
    for (let i = 0; i < sceneInfo.length; i++) {
      sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
      sceneInfo[
        i
      ].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
    }
  }

  function scrollLoop() {
    enterNewScene = false;

    prevScrollHeight = 0;
    for (let i = 0; i < currentScene; i++) {
      prevScrollHeight += sceneInfo[i].scrollHeight;
      // prevScrollHeight = prevScrollHeight + sceneInfo[i].scrollHeight;위에수식을 길게쓰면 이렇게 됨
    }

    if (yOFFset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
      currentScene++;
    }

    if (yOFFset < prevScrollHeight) {
      if (currentScene === 0) return;
      currentScene--;
    }

    document.body.setAttribute("id", `show-scene-${currentScene}`);
  }

  window.addEventListener("resize", setLayout);
  window.addEventListener("scroll", () => {
    yOFFset = window.pageYOffset;

    scrollLoop();
  });
  // window.addEventListener(`DOMContentLoaded`, setLayout);
  window.addEventListener(`load`, setLayout);
  window.addEventListener(`resize`, setLayout);

  // setLayout();
})();
