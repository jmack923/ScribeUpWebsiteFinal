import { addIcon } from "@iconify/react";

// Minimal offline registry: only icons referenced in `src/**` (keeps bundle + TS work sane).
// If you add new `Icon icon="..."` strings, add them here.
import lucide_activity from "@iconify/icons-lucide/activity";
import lucide_alert_triangle from "@iconify/icons-lucide/alert-triangle";
import lucide_arrow_left_right from "@iconify/icons-lucide/arrow-left-right";
import lucide_arrow_right from "@iconify/icons-lucide/arrow-right";
import lucide_badge_check from "@iconify/icons-lucide/badge-check";
import lucide_badge_dollar_sign from "@iconify/icons-lucide/badge-dollar-sign";
import lucide_badge_percent from "@iconify/icons-lucide/badge-percent";
import lucide_ban from "@iconify/icons-lucide/ban";
import lucide_banknote from "@iconify/icons-lucide/banknote";
import lucide_bar_chart_3 from "@iconify/icons-lucide/bar-chart-3";
import lucide_battery_charging from "@iconify/icons-lucide/battery-charging";
import lucide_bell from "@iconify/icons-lucide/bell";
import lucide_bell_ring from "@iconify/icons-lucide/bell-ring";
import lucide_building_2 from "@iconify/icons-lucide/building-2";
import lucide_calendar from "@iconify/icons-lucide/calendar";
import lucide_calendar_check from "@iconify/icons-lucide/calendar-check";
import lucide_check from "@iconify/icons-lucide/check";
import lucide_check_circle_2 from "@iconify/icons-lucide/check-circle-2";
import lucide_chevron_down from "@iconify/icons-lucide/chevron-down";
import lucide_chevron_right from "@iconify/icons-lucide/chevron-right";
import lucide_clock_3 from "@iconify/icons-lucide/clock-3";
import lucide_code from "@iconify/icons-lucide/code";
import lucide_code_2 from "@iconify/icons-lucide/code-2";
import lucide_coins from "@iconify/icons-lucide/coins";
import lucide_cpu from "@iconify/icons-lucide/cpu";
import lucide_credit_card from "@iconify/icons-lucide/credit-card";
import lucide_crown from "@iconify/icons-lucide/crown";
import lucide_file_badge_2 from "@iconify/icons-lucide/file-badge-2";
import lucide_file_check from "@iconify/icons-lucide/file-check";
import lucide_hand from "@iconify/icons-lucide/hand";
import lucide_heart_handshake from "@iconify/icons-lucide/heart-handshake";
import lucide_home from "@iconify/icons-lucide/home";
import lucide_instagram from "@iconify/icons-lucide/instagram";
import lucide_key from "@iconify/icons-lucide/key";
import lucide_landmark from "@iconify/icons-lucide/landmark";
import lucide_layers from "@iconify/icons-lucide/layers";
import lucide_layers_3 from "@iconify/icons-lucide/layers-3";
import lucide_layout from "@iconify/icons-lucide/layout";
import lucide_layout_template from "@iconify/icons-lucide/layout-template";
import lucide_link from "@iconify/icons-lucide/link";
import lucide_link_2 from "@iconify/icons-lucide/link-2";
import lucide_linkedin from "@iconify/icons-lucide/linkedin";
import lucide_list_checks from "@iconify/icons-lucide/list-checks";
import lucide_lock from "@iconify/icons-lucide/lock";
import lucide_lock_keyhole from "@iconify/icons-lucide/lock-keyhole";
import lucide_menu from "@iconify/icons-lucide/menu";
import lucide_mouse_pointer_click from "@iconify/icons-lucide/mouse-pointer-click";
import lucide_newspaper from "@iconify/icons-lucide/newspaper";
import lucide_package from "@iconify/icons-lucide/package";
import lucide_piggy_bank from "@iconify/icons-lucide/piggy-bank";
import lucide_play from "@iconify/icons-lucide/play";
import lucide_plug from "@iconify/icons-lucide/plug";
import lucide_plug_zap from "@iconify/icons-lucide/plug-zap";
import lucide_plus from "@iconify/icons-lucide/plus";
import lucide_radar from "@iconify/icons-lucide/radar";
import lucide_receipt from "@iconify/icons-lucide/receipt";
import lucide_refresh_cw from "@iconify/icons-lucide/refresh-cw";
import lucide_repeat_2 from "@iconify/icons-lucide/repeat-2";
import lucide_rocket from "@iconify/icons-lucide/rocket";
import lucide_scan_search from "@iconify/icons-lucide/scan-search";
import lucide_search from "@iconify/icons-lucide/search";
import lucide_search_check from "@iconify/icons-lucide/search-check";
import lucide_settings_2 from "@iconify/icons-lucide/settings-2";
import lucide_shield from "@iconify/icons-lucide/shield";
import lucide_shield_check from "@iconify/icons-lucide/shield-check";
import lucide_signal from "@iconify/icons-lucide/signal";
import lucide_sliders from "@iconify/icons-lucide/sliders";
import lucide_smartphone from "@iconify/icons-lucide/smartphone";
import lucide_smile_plus from "@iconify/icons-lucide/smile-plus";
import lucide_sparkles from "@iconify/icons-lucide/sparkles";
import lucide_target from "@iconify/icons-lucide/target";
import lucide_terminal from "@iconify/icons-lucide/terminal";
import lucide_timer from "@iconify/icons-lucide/timer";
import lucide_trophy from "@iconify/icons-lucide/trophy";
import lucide_trending_up from "@iconify/icons-lucide/trending-up";
import lucide_twitter from "@iconify/icons-lucide/twitter";
import lucide_users from "@iconify/icons-lucide/users";
import lucide_wallet from "@iconify/icons-lucide/wallet";
import lucide_wallet_cards from "@iconify/icons-lucide/wallet-cards";
import lucide_wand_2 from "@iconify/icons-lucide/wand-2";
import lucide_webhook from "@iconify/icons-lucide/webhook";
import lucide_wifi from "@iconify/icons-lucide/wifi";
import lucide_x from "@iconify/icons-lucide/x";
import lucide_zap from "@iconify/icons-lucide/zap";
import simple_icons_atandt from "@iconify/icons-simple-icons/atandt";
import simple_icons_doordash from "@iconify/icons-simple-icons/doordash";
import simple_icons_dropbox from "@iconify/icons-simple-icons/dropbox";
import simple_icons_hulu from "@iconify/icons-simple-icons/hulu";
import simple_icons_mastercard from "@iconify/icons-simple-icons/mastercard";
import simple_icons_netflix from "@iconify/icons-simple-icons/netflix";
import simple_icons_spotify from "@iconify/icons-simple-icons/spotify";
import simple_icons_visa from "@iconify/icons-simple-icons/visa";
import simple_icons_verizon from "@iconify/icons-simple-icons/verizon";
import simple_icons_youtube from "@iconify/icons-simple-icons/youtube";
import simple_icons_amazon from "@iconify/icons-simple-icons/amazon";
import simple_icons_apple from "@iconify/icons-simple-icons/apple";

const ICONS: Record<string, any> = {
  "lucide:activity": lucide_activity,
  "lucide:alert-triangle": lucide_alert_triangle,
  "lucide:arrow-left-right": lucide_arrow_left_right,
  "lucide:arrow-right": lucide_arrow_right,
  "lucide:badge-check": lucide_badge_check,
  "lucide:badge-dollar-sign": lucide_badge_dollar_sign,
  "lucide:badge-percent": lucide_badge_percent,
  "lucide:ban": lucide_ban,
  "lucide:banknote": lucide_banknote,
  "lucide:bar-chart-3": lucide_bar_chart_3,
  "lucide:battery-charging": lucide_battery_charging,
  "lucide:bell": lucide_bell,
  "lucide:bell-ring": lucide_bell_ring,
  "lucide:building-2": lucide_building_2,
  "lucide:calendar": lucide_calendar,
  "lucide:calendar-check": lucide_calendar_check,
  "lucide:check": lucide_check,
  "lucide:check-circle-2": lucide_check_circle_2,
  "lucide:chevron-down": lucide_chevron_down,
  "lucide:chevron-right": lucide_chevron_right,
  "lucide:clock-3": lucide_clock_3,
  "lucide:code": lucide_code,
  "lucide:code-2": lucide_code_2,
  "lucide:coins": lucide_coins,
  "lucide:cpu": lucide_cpu,
  "lucide:credit-card": lucide_credit_card,
  "lucide:crown": lucide_crown,
  "lucide:file-badge-2": lucide_file_badge_2,
  "lucide:file-check": lucide_file_check,
  "lucide:hand": lucide_hand,
  "lucide:heart-handshake": lucide_heart_handshake,
  "lucide:home": lucide_home,
  "lucide:instagram": lucide_instagram,
  "lucide:key": lucide_key,
  "lucide:landmark": lucide_landmark,
  "lucide:layers": lucide_layers,
  "lucide:layers-3": lucide_layers_3,
  "lucide:layout": lucide_layout,
  "lucide:layout-template": lucide_layout_template,
  "lucide:link": lucide_link,
  "lucide:link-2": lucide_link_2,
  "lucide:linkedin": lucide_linkedin,
  "lucide:list-checks": lucide_list_checks,
  "lucide:lock": lucide_lock,
  "lucide:lock-keyhole": lucide_lock_keyhole,
  "lucide:menu": lucide_menu,
  "lucide:mouse-pointer-click": lucide_mouse_pointer_click,
  "lucide:newspaper": lucide_newspaper,
  "lucide:package": lucide_package,
  "lucide:piggy-bank": lucide_piggy_bank,
  "lucide:play": lucide_play,
  "lucide:plug": lucide_plug,
  "lucide:plug-zap": lucide_plug_zap,
  "lucide:plus": lucide_plus,
  "lucide:radar": lucide_radar,
  "lucide:receipt": lucide_receipt,
  "lucide:refresh-cw": lucide_refresh_cw,
  "lucide:repeat-2": lucide_repeat_2,
  "lucide:rocket": lucide_rocket,
  "lucide:scan-search": lucide_scan_search,
  "lucide:search": lucide_search,
  "lucide:search-check": lucide_search_check,
  "lucide:settings-2": lucide_settings_2,
  "lucide:shield": lucide_shield,
  "lucide:shield-check": lucide_shield_check,
  "lucide:signal": lucide_signal,
  "lucide:sliders": lucide_sliders,
  "lucide:smartphone": lucide_smartphone,
  "lucide:smile-plus": lucide_smile_plus,
  "lucide:sparkles": lucide_sparkles,
  "lucide:target": lucide_target,
  "lucide:terminal": lucide_terminal,
  "lucide:timer": lucide_timer,
  "lucide:trophy": lucide_trophy,
  "lucide:trending-up": lucide_trending_up,
  "lucide:twitter": lucide_twitter,
  "lucide:users": lucide_users,
  "lucide:wallet": lucide_wallet,
  "lucide:wallet-cards": lucide_wallet_cards,
  "lucide:wand-2": lucide_wand_2,
  "lucide:webhook": lucide_webhook,
  "lucide:wifi": lucide_wifi,
  "lucide:x": lucide_x,
  "lucide:zap": lucide_zap,
  "simple-icons:atandt": simple_icons_atandt,
  "simple-icons:doordash": simple_icons_doordash,
  "simple-icons:dropbox": simple_icons_dropbox,
  "simple-icons:hulu": simple_icons_hulu,
  "simple-icons:mastercard": simple_icons_mastercard,
  "simple-icons:netflix": simple_icons_netflix,
  "simple-icons:amazon": simple_icons_amazon,
  "simple-icons:apple": simple_icons_apple,
  "simple-icons:spotify": simple_icons_spotify,
  "simple-icons:visa": simple_icons_visa,
  "simple-icons:verizon": simple_icons_verizon,
  "simple-icons:youtube": simple_icons_youtube,
};

let registered = false;
export function registerAppIcons() {
  if (registered) return;
  registered = true;
  for (const [name, data] of Object.entries(ICONS)) addIcon(name, data as any);
}

registerAppIcons();

