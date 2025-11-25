// hook useTelegramMainButton — для управления mainButton Telegram внутри страницы
import { useEffect } from "react";
import { getTelegramWebApp } from "../tg";
export function useTelegramMainButton({ text, onClick, visible }) {
  const tg = getTelegramWebApp();
  useEffect(() => {
    if (!tg) return;
    tg.MainButton.setParams({ text });
    if (visible) tg.MainButton.show(); else tg.MainButton.hide();
    tg.MainButton.onClick(onClick);
    return () => {
      tg.MainButton.offClick(onClick);
    };
  }, [text, onClick, visible, tg]);
}
