import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Clipboard,
  ToastAndroid,
  SafeAreaView,
  Dimensions,
} from 'react-native';

const {width} = Dimensions.get('window');

const EMOJI_CATEGORIES: {label: string; emojis: string[]}[] = [
  {
    label: 'SMILEYS & EMOTION',
    emojis: [
      '😀','😃','😄','😁','😆','😅','🤣','😂','🙂','🙃','🫠','😉','😊','😇',
      '🥰','😍','🤩','😘','😗','☺️','😚','😙','🥲','😋','😛','😜','🤪','😝',
      '🤑','🤗','🤭','🫢','🫣','🤫','🤔','🫡','🤐','🤨','😐','😑','😶','🫥',
      '😏','😒','🙄','😬','😮‍💨','🤥','🫨','😌','😔','😪','🤤','😴','😷','🤒',
      '🤕','🤢','🤮','🤧','🥵','🥶','🥴','😵','😵‍💫','🤯','🤠','🥳','🥸','😎',
      '🤓','🧐','😕','🫤','😟','🙁','☹️','😮','😯','😲','😳','🥺','🥹','😦',
      '😧','😨','😰','😥','😢','😭','😱','😖','😣','😞','😓','😩','😫','🥱',
      '😤','😡','😠','🤬','😈','👿','💀','☠️','💩','🤡','👹','👺','👻','👽',
      '👾','🤖','😺','😸','😹','😻','😼','😽','🙀','😿','😾','🙈','🙉','🙊',
      '💋','💌','💘','💝','💖','💗','💓','💞','💕','💟','❣️','💔','❤️‍🔥',
      '❤️‍🩹','❤️','🩷','🧡','💛','💚','💙','🩵','💜','🤎','🖤','🩶','🤍',
      '💯','💢','💥','💫','💦','💨','🕳️','💬','🗨️','🗯️','💭','💤',
    ],
  },
  {
    label: 'PEOPLE & BODY',
    emojis: [
      '👋','🤚','🖐️','✋','🖖','🫱','🫲','🫳','🫴','🫷','🫸','👌','🤌','🤏',
      '✌️','🤞','🫰','🤟','🤘','🤙','👈','👉','👆','🖕','👇','☝️','🫵','👍',
      '👎','✊','👊','🤛','🤜','👏','🙌','🫶','👐','🤲','🤝','🙏','✍️','💅',
      '🤳','💪','🦾','🦿','🦵','🦶','👂','🦻','👃','🫀','🫁','🧠','🦷','🦴',
      '👀','👁️','👅','👄','🫦','👶','🧒','👦','👧','🧑','👱','👨','🧔','👩',
      '🧓','👴','👵','🙍','🙎','🙅','🙆','💁','🙋','🧏','🙇','🤦','🤷','👮',
      '🕵️','💂','🥷','👷','🤴','👸','👳','👲','🧕','🤵','👰','🤰','🫃','🫄',
      '🤱','👼','🎅','🤶','🦸','🦹','🧙','🧝','🧛','🧟','🧌','🧞','🧜','🧚',
      '🧑‍🤝‍🧑','👫','👬','👭','💏','💑','👪','🗣️','👤','👥','🫂','👣',
    ],
  },
  {
    label: 'ANIMALS & NATURE',
    emojis: [
      '🐵','🐒','🦍','🦧','🐶','🐕','🦮','🐕‍🦺','🐩','🐺','🦊','🦝','🐱',
      '🐈','🐈‍⬛','🐓','🦃','🦤','🦚','🦜','🦢','🦩','🕊️','🐇','🦨','🦡',
      '🦫','🦦','🦥','🐁','🐀','🐿️','🦔','🐾','🐉','🐲','🌵','🎄','🌲','🌳',
      '🌴','🪵','🌱','🌿','☘️','🍀','🎍','🪴','🎋','🍃','🍂','🍁','🪺','🪹',
      '🍄','🌾','💐','🌷','🌹','🥀','🪷','🌺','🌸','🌼','🌻','🌞','🌝','🌛',
      '🌜','🌚','🌕','🌖','🌗','🌘','🌑','🌒','🌓','🌔','🌙','🌟','⭐','🌠',
      '🌌','☁️','⛅','🌈','❄️','⛄','🌊','🐘','🦣','🦏','🦛','🐪','🐫','🦒',
      '🦘','🦬','🐃','🐂','🐄','🐎','🐖','🐏','🐑','🦙','🐐','🦌','🦝','🐸',
      '🐊','🐢','🦎','🐍','🦕','🦖','🐳','🐋','🐬','🦭','🐟','🐠','🐡','🦈',
      '🐙','🦋','🐛','🐜','🐝','🪲','🐞','🦗','🕷️','🦂','🦟','🪰','🪱','🦠',
    ],
  },
  {
    label: 'FOOD & DRINK',
    emojis: [
      '🍇','🍈','🍉','🍊','🍋','🍌','🍍','🥭','🍎','🍏','🍐','🍑','🍒','🍓',
      '🫐','🥝','🍅','🫒','🥥','🥑','🍆','🥔','🥕','🌽','🌶️','🫑','🥒','🥬',
      '🥦','🧄','🧅','🍄','🥜','🫘','🌰','🍞','🥐','🥖','🫓','🥨','🥯','🥞',
      '🧇','🧀','🍖','🍗','🥩','🥓','🌭','🍔','🍟','🍕','🫔','🌮','🌯','🥙',
      '🧆','🥚','🍳','🥘','🍲','🫕','🥣','🥗','🍿','🧂','🥫','🍱','🍘','🍙',
      '🍚','🍛','🍜','🍝','🍠','🍢','🍣','🍤','🍥','🥮','🍡','🥟','🥠','🥡',
      '🦀','🦞','🦐','🦑','🦪','🍦','🍧','🍨','🍩','🍪','🎂','🍰','🧁','🥧',
      '🍫','🍬','🍭','🍮','🍯','🍼','🥛','☕','🫖','🍵','🧃','🥤','🧋','🍶',
      '🍺','🍻','🥂','🍷','🫗','🥃','🍸','🍹','🧉','🍾','🧊','🥄','🍴','🍽️',
      '🥢','🫙',
    ],
  },
  {
    label: 'TRAVEL & PLACES',
    emojis: [
      '🌍','🌎','🌏','🌐','🗺️','🧭','🏔️','⛰️','🌋','🗻','🏕️','🏖️','🏜️',
      '🏝️','🏞️','🏟️','🏛️','🏗️','🧱','🏘️','🏚️','🏠','🏡','🏢','🏣','🏤',
      '🏥','🏦','🏨','🏩','🏪','🏫','🏬','🏭','🏯','🏰','💒','🗼','🗽','⛪',
      '🕌','🛕','🕍','⛩️','🕋','⛲','⛺','🌃','🏙️','🌄','🌅','🌆','🌇','🌉',
      '🎠','🛝','🎡','🎢','🎪','🚂','🚃','🚄','🚅','🚆','🚇','🚈','🚉','🚊',
      '🚝','🚞','🚋','🚌','🚍','🚎','🚐','🚑','🚒','🚓','🚔','🚕','🚖','🚗',
      '🚘','🚙','🛻','🚚','🚛','🚜','🏎️','🏍️','🛵','🦽','🦼','🚲','🛴','🛹',
      '🛼','🚏','⛽','🛞','🚨','🚥','🚦','🛑','🚧','⚓','🛟','⛵','🛶','🚤',
      '🛳️','⛴️','🛥️','🚢','✈️','🛩️','🛫','🛬','🪂','💺','🚁','🛰️','🚀','🛸',
    ],
  },
  {
    label: 'ACTIVITIES',
    emojis: [
      '🎃','🎄','🎆','🎇','🧨','✨','🎉','🎊','🎋','🎍','🎎','🎏','🎐','🎑',
      '🧧','🎀','🎁','🎗️','🎟️','🎫','🎖️','🏆','🥇','🥈','🥉','🏅','🎽','🥊',
      '🥋','🎿','🛷','🥌','🪃','🏹','🛡️','🎮','🕹️','🎲','🧩','🧸','🪅','🪆',
      '♟️','🃏','🀄','🎴','🎭','🖼️','🎨','🧵','🪡','🧶','🪢','🎙️','🎚️','🎛️',
      '📻','🎷','🪗','🎸','🎹','🎺','🎻','🥁','🪘','🎤','🎧','⚽','🏀','🏈',
      '⚾','🥎','🏐','🏉','🥏','🎾','🏸','🏒','🏑','🥍','🏏','🪃','🏓','🏸',
      '🥊','🥋','🤺','🏇','⛷️','🏂','🪂','🏋️','🤼','🤸','⛹️','🤺','🏊','🚵',
      '🚴','🧘','🏄','🤽','🚣','🧗','🤾','🏌️','🏇','🧜',
    ],
  },
  {
    label: 'OBJECTS',
    emojis: [
      '📱','📲','☎️','📞','📟','📠','🔋','🪫','🔌','💻','🖥️','🖨️','⌨️','🖱️',
      '💾','💿','📀','🧮','🎥','🎞️','📽️','🎬','📺','📷','📸','📹','📼','🔍',
      '🔎','🕯️','💡','🔦','🏮','🪔','🧲','💣','🔫','🪓','⛏️','⚒️','🛠️','⚔️',
      '🪬','🧿','🪄','🔮','💊','💉','🩸','🩹','🩺','🩻','🚪','🛋️','🪑','🚽',
      '🚿','🛁','🧴','🧷','🧹','🧺','🧻','🧼','🫧','🪥','🧽','🧯','🛒','🪟',
      '🪞','🛍️','📦','📫','📪','📬','📭','📮','🗳️','✏️','✒️','🖋️','🖊️','📝',
      '📁','📂','🗂️','📅','📆','🗒️','🗓️','📇','📈','📉','📊','📋','📌','📍',
      '📎','🖇️','📏','📐','✂️','🗃️','🗄️','🗑️','🔒','🔓','🔏','🔐','🔑','🗝️',
      '🔨','🪚','🔧','🪛','🔩','⚙️','🗜️','⚖️','🦯','🔗','⛓️','🪝','🧰',
      '🔭','🔬','💉','🩺','📡','🧬','🔱','📛','🔰','⭕',
    ],
  },
  {
    label: 'SYMBOLS',
    emojis: [
      '🏧','🚮','🚰','♿','🚹','🚺','🚻','🚼','🚾','🛂','🛃','🛄','🛅','⚠️',
      '🚸','⛔','🚫','🚳','🚭','🚯','🚱','🚷','📵','🔞','☢️','☣️','⬆️','↗️',
      '➡️','↘️','⬇️','↙️','⬅️','↖️','↕️','↔️','↩️','↪️','⤴️','⤵️','🔃','🔄',
      '🔙','🔚','🔛','🔜','🔝','⚛️','🕉️','✡️','☸️','☯️','✝️','☦️','⛎','♈',
      '♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓','🔯','🪯','♀️','♂️',
      '⚧️','✖️','➕','➖','➗','🟰','♾️','‼️','⁉️','❓','❔','❕','❗','〰️',
      '💱','💲','♻️','⚜️','🔱','📛','🔰','⭕','✅','☑️','✔️','❌','❎','➰',
      '➿','〽️','✳️','✴️','❇️','©️','®️','™️','🔅','🔆','📶','🛜','📳','📴',
      '📵','🔇','🔈','🔉','🔊','🔔','🔕','📣','📢','💤','🎵','🎶','🅰️','🅱️',
      '🆎','🆑','🅾️','🆘','❎','📴','📳','🆔','📱','🔣','ℹ️','🔤','🔡','🔢',
      '🔀','🔁','🔂','▶️','⏩','⏭️','⏯️','◀️','⏪','⏮️','🔼','⏫','🔽','⏬',
      '⏸️','⏹️','⏺️','🎦','🔅','🔆','📶','📳','📴',
    ],
  },
  {
    label: 'FLAGS',
    emojis: [
      '🏁','🚩','🎌','🏴','🏳️','🏳️‍🌈','🏳️‍⚧️','🏴‍☠️',
      '🇦🇩','🇦🇪','🇦🇫','🇦🇬','🇦🇱','🇦🇲','🇦🇴','🇦🇷','🇦🇸','🇦🇹','🇦🇺',
      '🇦🇼','🇦🇿','🇧🇦','🇧🇧','🇧🇩','🇧🇪','🇧🇫','🇧🇬','🇧🇭','🇧🇮','🇧🇯',
      '🇧🇲','🇧🇳','🇧🇴','🇧🇷','🇧🇸','🇧🇹','🇧🇼','🇧🇾','🇧🇿','🇨🇦','🇨🇩',
      '🇨🇫','🇨🇬','🇨🇭','🇨🇮','🇨🇰','🇨🇱','🇨🇲','🇨🇳','🇨🇴','🇨🇷','🇨🇺',
      '🇨🇻','🇨🇾','🇨🇿','🇩🇪','🇩🇯','🇩🇰','🇩🇲','🇩🇴','🇩🇿','🇪🇨','🇪🇪',
      '🇪🇬','🇪🇷','🇪🇸','🇪🇹','🇪🇺','🇫🇮','🇫🇯','🇫🇲','🇫🇷','🇬🇦','🇬🇧',
      '🇬🇩','🇬🇪','🇬🇭','🇬🇲','🇬🇳','🇬🇶','🇬🇷','🇬🇹','🇬🇺','🇬🇼','🇬🇾',
      '🇭🇰','🇭🇳','🇭🇷','🇭🇹','🇭🇺','🇮🇩','🇮🇪','🇮🇱','🇮🇳','🇮🇶','🇮🇷',
      '🇮🇸','🇮🇹','🇯🇲','🇯🇴','🇯🇵','🇰🇪','🇰🇬','🇰🇭','🇰🇮','🇰🇲','🇰🇳',
      '🇰🇵','🇰🇷','🇰🇼','🇰🇾','🇰🇿','🇱🇦','🇱🇧','🇱🇨','🇱🇮','🇱🇰','🇱🇷',
      '🇱🇸','🇱🇹','🇱🇺','🇱🇻','🇱🇾','🇲🇦','🇲🇨','🇲🇩','🇲🇪','🇲🇬','🇲🇭',
      '🇲🇰','🇲🇱','🇲🇲','🇲🇳','🇲🇴','🇲🇵','🇲🇷','🇲🇸','🇲🇹','🇲🇺','🇲🇻',
      '🇲🇼','🇲🇽','🇲🇾','🇲🇿','🇳🇦','🇳🇪','🇳🇬','🇳🇮','🇳🇱','🇳🇴','🇳🇵',
      '🇳🇷','🇳🇿','🇴🇲','🇵🇦','🇵🇪','🇵🇬','🇵🇭','🇵🇰','🇵🇱','🇵🇷','🇵🇸',
      '🇵🇹','🇵🇼','🇵🇾','🇶🇦','🇷🇴','🇷🇸','🇷🇺','🇷🇼','🇸🇦','🇸🇧','🇸🇨',
      '🇸🇩','🇸🇪','🇸🇬','🇸🇮','🇸🇰','🇸🇱','🇸🇲','🇸🇳','🇸🇴','🇸🇷','🇸🇸',
      '🇸🇹','🇸🇻','🇸🇾','🇸🇿','🇹🇩','🇹🇬','🇹🇭','🇹🇯','🇹🇱','🇹🇲','🇹🇳',
      '🇹🇴','🇹🇷','🇹🇹','🇹🇻','🇹🇼','🇹🇿','🇺🇦','🇺🇬','🇺🇳','🇺🇸','🇺🇾',
      '🇺🇿','🇻🇦','🇻🇨','🇻🇪','🇻🇳','🇻🇺','🇼🇸','🇾🇪','🇿🇦','🇿🇲','🇿🇼',
    ],
  },
];

// Build flat list with section headers interleaved
type ListItem =
  | {type: 'header'; label: string; key: string; span: number}
  | {type: 'emoji'; emoji: string; key: string};

const COLS = 6;

const buildRows = () => {
  // We'll render rows manually: headers take full row, emojis fill in COLS per row
  const rows: ListItem[][] = [];
  for (const cat of EMOJI_CATEGORIES) {
    // Header row (spans all columns)
    rows.push([{type: 'header', label: cat.label, key: `h-${cat.label}`, span: COLS}]);
    // Emoji rows
    for (let i = 0; i < cat.emojis.length; i += COLS) {
      rows.push(
        cat.emojis.slice(i, i + COLS).map(e => ({
          type: 'emoji' as const,
          emoji: e,
          key: `e-${e}-${i}`,
        })),
      );
    }
  }
  return rows;
};

const ROWS = buildRows();
const CELL_SIZE = Math.floor((width - 32) / COLS);

export default function App() {
  const [selected, setSelected] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const toggleEmoji = useCallback((emoji: string) => {
    setSelected(prev =>
      prev.includes(emoji) ? prev.filter(e => e !== emoji) : [...prev, emoji],
    );
    setCopied(false);
  }, []);

  const handleCopy = useCallback(() => {
    if (selected.length === 0) return;
    Clipboard.setString(selected.join(''));
    setCopied(true);
    ToastAndroid.show('COPIED', ToastAndroid.SHORT);
    setTimeout(() => setCopied(false), 2000);
  }, [selected]);

  const handleClear = useCallback(() => {
    setSelected([]);
    setCopied(false);
  }, []);

  const renderRow = useCallback(
    ({item}: {item: ListItem[]}) => {
      if (item[0]?.type === 'header') {
        const h = item[0] as {type: 'header'; label: string; key: string};
        return (
          <View key={h.key} style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>{h.label}</Text>
          </View>
        );
      }
      return (
        <View style={styles.row}>
          {item.map(cell => {
            if (cell.type !== 'emoji') return null;
            const isSelected = selected.includes(cell.emoji);
            return (
              <TouchableOpacity
                key={cell.key}
                style={[styles.emojiCell, isSelected && styles.emojiCellSelected]}
                onPress={() => toggleEmoji(cell.emoji)}
                activeOpacity={0.55}>
                <Text style={styles.emojiText}>{cell.emoji}</Text>
                {isSelected && <View style={styles.dot} />}
              </TouchableOpacity>
            );
          })}
        </View>
      );
    },
    [selected, toggleEmoji],
  );

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      {/* Header bar */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>EMOJIS</Text>
        {selected.length > 0 && (
          <TouchableOpacity onPress={handleClear} activeOpacity={0.6}>
            <Text style={styles.clearBtn}>CLEAR</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Selection tray */}
      {selected.length > 0 && (
        <View style={styles.selectionBar}>
          <Text style={styles.selectionText} numberOfLines={1} ellipsizeMode="tail">
            {selected.join('')}
          </Text>
          <TouchableOpacity
            style={[styles.copyBtn, copied && styles.copyBtnDone]}
            onPress={handleCopy}
            activeOpacity={0.6}>
            <Text style={styles.copyBtnText}>{copied ? '✓' : '⎘'}</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Grid */}
      <FlatList
        data={ROWS}
        keyExtractor={(_, i) => String(i)}
        renderItem={renderRow}
        initialNumToRender={30}
        maxToRenderPerBatch={40}
        windowSize={8}
        style={styles.list}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {flex: 1, backgroundColor: '#000000'},
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#222222',
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 12,
    fontFamily: 'PublicSans-Regular',
    letterSpacing: 7,
    fontWeight: '300',
  },
  clearBtn: {
    color: '#555555',
    fontSize: 10,
    fontFamily: 'PublicSans-Regular',
    letterSpacing: 4,
  },
  selectionBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#222222',
    minHeight: 52,
  },
  selectionText: {
    flex: 1,
    fontSize: 24,
    color: '#ffffff',
    lineHeight: 30,
  },
  copyBtn: {
    marginLeft: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#444444',
  },
  copyBtnDone: {
    borderColor: '#ffffff',
  },
  copyBtnText: {
    color: '#ffffff',
    fontSize: 20,
    lineHeight: 24,
  },
  list: {flex: 1},
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  sectionHeader: {
    paddingTop: 28,
    paddingBottom: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#1c1c1c',
    marginBottom: 6,
  },
  sectionHeaderText: {
    color: '#3a3a3a',
    fontSize: 8,
    fontFamily: 'PublicSans-Regular',
    letterSpacing: 5,
    fontWeight: '400',
  },
  row: {
    flexDirection: 'row',
  },
  emojiCell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  emojiCellSelected: {
    borderWidth: 1,
    borderColor: '#ffffff',
  },
  emojiText: {
    fontSize: CELL_SIZE * 0.5,
    lineHeight: CELL_SIZE * 0.7,
    textAlign: 'center',
  },
  dot: {
    position: 'absolute',
    bottom: 3,
    right: 3,
    width: 3,
    height: 3,
    borderRadius: 2,
    backgroundColor: '#ffffff',
  },
});
