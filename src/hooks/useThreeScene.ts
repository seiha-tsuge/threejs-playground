import { useEffect, useState, type RefObject } from 'react'
import { createSceneAnimation } from '../three/createSceneAnimation'
import { createSpaceScene, disposeSpaceScene } from '../three/createSpaceScene'
import { observeSceneResize } from '../three/observeSceneResize'

const WEBGPU_ERROR_MESSAGE =
  'WebGPUの初期化に失敗しました。対応ブラウザで確認してください。'

export function useThreeScene(
  containerRef: RefObject<HTMLDivElement | null>,
): string | null {
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const container = containerRef.current

    if (!container) {
      return
    }

    let disposed = false
    const spaceScene = createSpaceScene(container)
    const stopObservingResize = observeSceneResize({
      container,
      camera: spaceScene.camera,
      renderer: spaceScene.renderer,
    })
    const render = createSceneAnimation(spaceScene)

    const initializeRenderer = async () => {
      try {
        await spaceScene.renderer.init()

        if (!disposed) {
          spaceScene.renderer.setAnimationLoop(render)
        }
      } catch (initializationError) {
        if (!disposed) {
          console.error(initializationError)
          setError(WEBGPU_ERROR_MESSAGE)
        }
      }
    }

    void initializeRenderer()

    return () => {
      disposed = true
      stopObservingResize()
      disposeSpaceScene(spaceScene, container)
    }
  }, [containerRef])

  return error
}
