import React from 'react'
import Link from 'gatsby-link'
import "prismjs/themes/prism-tomorrow.css"
import "prismjs/plugins/line-numbers/prism-line-numbers.css"
import profilePic from '../components/profile-pic.jpg'
import letter from './letter.svg'

import { rhythm, scale } from '../utils/typography'

const blogTitle = `Bryce Dooley`
const subTitle = 'A blog about software engineering & web development.'

class Template extends React.Component {
  render() {
    const { location, children } = this.props
    let header

    let rootPath = `/`
    if (typeof __PREFIX_PATHS__ !== `undefined` && __PREFIX_PATHS__) {
      rootPath = __PATH_PREFIX__ + `/`
    }

    if (location.pathname === rootPath) {
      header = (
      //   <h1
      //     style={{
      //       ...scale(1.5),
      //       marginBottom: rhythm(1.5),
      //       marginTop: 0,
      //       textAlign: 'center'
      //     }}
      //   >
      //     <Link
      //       style={{
      //         boxShadow: 'none',
      //         textDecoration: 'none',
      //         color: 'inherit',
      //       }}
      //       to={'/'}
      //     >
      //       {blogTitle}
      //     </Link>
      //   </h1>
        <img
          src={letter}
          alt={`B`}
          style={{
            width: rhythm(3),
            height: rhythm(3),
            marginRight: 'auto',
            marginLeft: 'auto',
            display: 'block',
            marginBottom: '2.67rem'
          }}
        />
      )
    } else {
      header = (
        <p
          style={{
            // fontFamily: 'Montserrat, sans-serif',
            // ...scale(.65),
            fontWeight: 'bold',
            marginTop: 0,
            marginBottom: rhythm(-1),
          }}
        >
          <Link
            style={{
              boxShadow: 'none',
              textDecoration: 'none',
              color: 'inherit',
            }}
            to={'/'}
          >
            <img
              src={letter}
              alt={`B`}
              style={{
                width: rhythm(2),
                height: rhythm(2),
              }}
            />
          </Link>
        </p>
      )
    }
    return (
      <div
        style={{
          marginLeft: 'auto',
          marginRight: 'auto',
          maxWidth: rhythm(24),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >
        {header}
        {children()}
      </div>
    )
  }
}

export default Template

function getRandomAdj() {
  const adj = [
    "babelike",
    "baboonish",
    "babyish",
    "babylonian",
    "baccate",
    "bacchanal",
    "bacchanalian",
    "bacchantic",
    "bacchic",
    "bacciferous",
    "baccivorous",
    "bacillar",
    "bacillary",
    "bacilliform",
    "back",
    "backbreaking",
    "backed",
    "backhand",
    "backhanded",
    "backless",
    "backmost",
    "backstage",
    "backstair",
    "backstairs",
    "backswept",
    "backward",
    "bacteremic",
    "bacterial",
    "bactericidal",
    "bacterioid",
    "bacterioidal",
    "bacteriologic",
    "bacteriological",
    "bacteriolytic",
    "bacteriophagic",
    "bacteriophagous",
    "bacteriostatic",
    "bacteroid",
    "bacteroidal",
    "baculiform",
    "bad",
    "baffled",
    "baffling",
    "baggy",
    "bahai",
    "bahamian",
    "bahraini",
    "bailable",
    "baked",
    "baking",
    "balanced",
    "balconied",
    "bald",
    "balding",
    "baleful",
    "balking",
    "balky",
    "balletic",
    "ballistic",
    "bally",
    "balmy",
    "balsamic",
    "balsamy",
    "baltic",
    "balzacian",
    "banal",
    "banausic",
    "bandaged",
    "banded",
    "bandy",
    "baneful",
    "banging",
    "bangladeshi",
    "bankable",
    "bankrupt",
    "banned",
    "banner",
    "bantam",
    "bantering",
    "bantoid",
    "bantu",
    "baptised",
    "baptismal",
    "baptistic",
    "baptized",
    "barbadian",
    "barbarian",
    "barbaric",
    "barbarous",
    "barbate",
    "barbecued",
    "barbed",
    "barbellate",
    "bardic",
    "bare",
    "bareback",
    "barebacked",
    "bared",
    "barefaced",
    "barefoot",
    "barefooted",
    "barehanded",
    "bareheaded",
    "barelegged",
    "baric",
    "baritone",
    "barky",
    "barmy",
    "barographic",
    "barometric",
    "barometrical",
    "baronial",
    "baroque",
    "barred",
    "barreled",
    "barrelled",
    "barren",
    "barricaded",
    "barytic",
    "basal",
    "basaltic",
    "base",
    "baseborn",
    "based",
    "baseless",
    "bashful",
    "basic",
    "basidial",
    "basidiomycetous",
    "basidiosporous",
    "basifixed",
    "basilar",
    "basilary",
    "basilican",
    "basinal",
    "basined",
    "basipetal",
    "basiscopic",
    "basophilic",
    "bass",
    "bastard",
    "bastardised",
    "bastardized",
    "bastardly",
    "bastioned",
    "bated",
    "bathetic",
    "batholithic",
    "batholitic",
    "bathyal",
    "bathymetric",
    "bathymetrical",
    "batrachian",
    "bats",
    "battered",
    "battleful",
    "battlemented",
    "batty",
    "batwing",
    "bauxitic",
    "bavarian",
    "bawdy",
    "bay",
    "bayesian",
    "beaded",
    "beadlike",
    "beady",
    "beaked",
    "beakless",
    "beaklike",
    "beaming",
    "beamish",
    "beamy",
    "bearable",
    "bearded",
    "beardless",
    "beardown",
    "bearing",
    "bearish",
    "beastly",
    "beat",
    "beatable",
    "beaten",
    "beatific",
    "beatified",
    "beauteous",
    "beautiful",
    "becalmed",
    "becoming",
    "bedaubed",
    "bedded",
    "bedewed",
    "bedfast",
    "bedimmed",
    "bedless",
    "bedraggled",
    "bedrid",
    "bedridden",
    "beechen",
    "beefy",
    "beery",
    "beethovenian",
    "beetle",
    "beetling",
    "befitting",
    "befogged",
    "beforehand",
    "befouled",
    "befuddled",
    "beggarly",
    "beginning",
    "begotten",
    "begrimed",
    "beguiled",
    "beguiling",
    "behavioral",
    "behaviorist",
    "behavioristic",
    "behavioural",
    "behaviourist",
    "behaviouristic",
    "beheaded",
    "behind",
    "behindhand",
    "beholden",
    "beige",
    "belarusian",
    "belated",
    "belemnitic",
    "belgian",
    "believable",
    "belittled",
    "belittling",
    "bellbottom",
    "belletristic",
    "bellicose",
    "bellied",
    "belligerent",
    "bellying",
    "bellyless",
    "beloved",
    "belowground",
    "belted",
    "beltless",
    "beltlike",
    "bemused",
    "bendable",
    "bended",
    "benedictine",
    "benedictive",
    "benedictory",
    "benefic",
    "beneficed",
    "beneficent",
    "beneficial",
    "beneficiary",
    "benevolent",
    "bengali",
    "benighted",
    "benign",
    "benignant",
    "beninese",
    "bent",
    "benthal",
    "benthic",
    "benthonic",
    "bentonitic",
    "benumbed",
    "benzenoid",
    "benzoic",
    "benzylic",
    "bereaved",
    "bereft",
    "bermudan",
    "berried",
    "berrylike",
    "berserk",
    "beseeching",
    "besieged",
    "besotted",
    "bespectacled",
    "bespoke",
    "bespoken",
    "besprent",
    "best",
    "bestial",
    "bestubbled",
    "beta",
    "betrothed",
    "better",
    "bettering",
    "betting",
    "betulaceous",
    "bewhiskered",
    "bewildered",
    "bewitched",
    "bewitching",
    "bhutanese",
    "biannual",
    "bias",
    "biased",
    "biaural",
    "biauricular",
    "biaxal",
    "biaxate",
    "biaxial",
    "bibbed",
    "bibless",
    "biblical",
    "bibliographic",
    "bibliographical",
    "bibliolatrous",
    "bibliomaniacal",
    "bibliophilic",
    "bibliopolic",
    "bibliothecal",
    "bibliothecarial",
    "bibliotic",
    "bibulous",
    "bicameral",
    "bicapsular",
    "bicentenary",
    "bicentennial",
    "bicentric",
    "bicephalous",
    "bichromated",
    "bichrome",
    "bicipital",
    "bicolor",
    "bicolored",
    "bicolour",
    "bicoloured",
    "biconcave",
    "biconvex",
    "bicorn",
    "bicornate",
    "bicorned",
    "bicornuate",
    "bicornuous",
    "bicuspid",
    "bicuspidate",
    "bicyclic",
    "bicylindrical",
    "biddable",
    "bidentate",
    "bidirectional",
    "biedermeier",
    "biennial",
    "biface",
    "bifacial",
    "bifid",
    "bifilar",
    "biflagellate",
    "bifocal",
    "bifoliate",
    "biform",
    "bifurcate",
    "bifurcated",
    "big",
    "bigamous",
    "bigeminal",
    "bigeneric",
    "bigger",
    "biggish",
    "bigheaded",
    "bighearted",
    "bigmouthed",
    "bignoniaceous",
    "bigoted",
    "bilabial",
    "bilabiate",
    "bilateral",
    "bilgy",
    "biliary",
    "bilinear",
    "bilingual",
    "bilious",
    "billed",
    "billiard",
    "billion",
    "billionth",
    "billowing",
    "billowy",
    "bilobate",
    "bilobated",
    "bilobed",
    "bilocular",
    "biloculate",
    "bimanual",
    "bimestrial",
    "bimetal",
    "bimetallic",
    "bimetallistic",
    "bimillenial",
    "bimodal",
    "bimolecular",
    "bimonthly",
    "bimorphemic",
    "bimotored",
    "binary",
    "binate",
    "binaural",
    "bindable",
    "binding",
    "binocular",
    "binomial",
    "binominal",
    "binuclear",
    "binucleate",
    "binucleated",
    "biocatalytic",
    "biochemical",
    "bioclimatic",
    "biodegradable",
    "biogenetic",
    "biogenic",
    "biogenous",
    "biogeographic",
    "biogeographical",
    "biographic",
    "biographical",
    "biologic",
    "biological",
    "biologistic",
    "bioluminescent",
    "biomedical",
    "bionic",
    "bionomic",
    "bionomical",
    "biosynthetic",
    "biosystematic",
    "biotic",
    "biotitic",
    "biotypic",
    "biovular",
    "biparous",
    "bipartisan",
    "bipartite",
    "bipartizan",
    "biped",
    "bipedal",
    "bipinnate",
    "bipinnatifid",
    "bipolar",
    "biquadratic",
    "biracial",
    "biradial",
    "biramous",
    "birch",
    "birchen",
    "birefringent",
    "birken",
    "bisectional",
    "biserrate",
    "bisexual",
    "bismarckian",
    "bismuthal",
    "bismuthic",
    "bisontine",
    "bistered",
    "bistred",
    "bistroic",
    "bisulcate",
    "biting",
    "bitter",
    "bitterish",
    "bittersweet",
    "bittie",
    "bitty",
    "bitumenoid",
    "bituminoid",
    "bituminous",
    "bivalent",
    "bivalve",
    "bivalved",
    "bivariate",
    "biweekly",
    "biyearly",
    "bizarre",
    "bizonal",
    "blabbermouthed",
    "blabby",
    "black",
    "blackened",
    "blackguardly",
    "blackish",
    "bladderlike",
    "bladdery",
    "bladed",
    "bladelike",
    "blae",
    "blamable",
    "blame",
    "blameable",
    "blamed",
    "blameful",
    "blameless",
    "blameworthy",
    "blanched",
    "bland",
    "blank",
    "blanket",
    "blanketed",
    "blaring",
    "blase",
    "blasphemous",
    "blasted",
    "blastemal",
    "blastematic",
    "blastemic",
    "blasting",
    "blastocoelic",
    "blastodermatic",
    "blastodermic",
    "blastogenetic",
    "blastomeric",
    "blastomycotic",
    "blastoporal",
    "blastoporic",
    "blastospheric",
    "blastular",
    "blatant",
    "blate",
    "blazing",
    "bleached",
    "bleak",
    "blear",
    "bleary",
    "blebbed",
    "blebby",
    "blemished",
    "blended",
    "blessed",
    "blest",
    "blighted",
    "blimpish",
    "blind",
    "blinded",
    "blindfold",
    "blindfolded",
    "blinding",
    "blinking",
    "blissful",
    "blistering",
    "blistery",
    "blithe",
    "blithesome",
    "blockaded",
    "blockading",
    "blocked",
    "blockheaded",
    "blockish",
    "blocky",
    "blond",
    "blonde",
    "bloodcurdling",
    "blooded",
    "bloodguilty",
    "bloodless",
    "bloodshot",
    "bloodstained",
    "bloodsucking",
    "bloodthirsty",
    "bloody",
    "blooming",
    "blotched",
    "blotchy",
    "blotto",
    "blown",
    "blowsy",
    "blowy",
    "blowzy",
    "blubbery",
    "blue",
    "blueish",
    "bluff",
    "bluish",
    "blunt",
    "blunted",
    "blurred",
    "blurry",
    "blushful",
    "blushing",
    "blustering",
    "blusterous",
    "blustery",
    "boastful",
    "bobtail",
    "bobtailed",
    "bodacious",
    "bodied",
    "bodiless",
    "bodily",
    "bodyless",
    "boeotian",
    "boffo",
    "bogartian",
    "boggy",
    "bogus",
    "bohemian",
    "boiled",
    "boisterous",
    "bold",
    "bolivian",
    "bolographic",
    "bolometric",
    "bolshevik",
    "bolshevist",
    "bolshevistic",
    "bolshy",
    "bombastic",
    "bombproof",
    "bondable",
    "bone",
    "boned",
    "boneheaded",
    "boneless",
    "bonelike",
    "boney",
    "bonkers",
    "bonnie",
    "bonny",
    "bony",
    "bonzer",
    "bookable",
    "booked",
    "bookish",
    "boolean",
    "booming",
    "boon",
    "boorish",
    "booted",
    "bootleg",
    "bootless",
    "bootlicking",
    "boozy",
    "boracic",
    "borated",
    "bordered",
    "borderline",
    "boreal",
    "bored",
    "boric",
    "boring",
    "born",
    "boronic",
    "boskopoid",
    "bosky",
    "bosnian",
    "bosomed",
    "bosomy",
    "boss",
    "bossy",
    "botanic",
    "botanical",
    "botched",
    "botchy",
    "both",
    "bothered",
    "bothersome",
    "botonee",
    "botonnee",
    "botryoid",
    "botryoidal",
    "botswanan",
    "bottom",
    "bottomed",
    "bottomless",
    "bottommost",
    "botuliform",
    "botulinal",
    "bouffant",
    "boughed",
    "boughless",
    "boughten",
    "bouldered",
    "bouldery",
    "bouncing",
    "bouncy",
    "bound",
    "bounded",
    "bounden",
    "bounderish",
    "boundless",
    "bounteous",
    "bountied",
    "bountiful",
    "bourgeois",
    "boustrophedonic",
    "bovid",
    "bovine",
    "bowed",
    "bowelless",
    "bowery",
    "bowfront",
    "bowing",
    "bowleg",
    "bowlegged",
    "boxed",
    "boxlike",
    "boxy",
    "boyish",
    "boylike",
    "boytrose",
    "braced",
    "brachial",
    "brachiate",
    "brachiopod",
    "brachiopodous",
    "brachycephalic",
    "brachycranial",
    "brachycranic",
    "brachydactylic",
    "brachydactylous",
    "brachypterous",
    "brachyurous",
    "bracing",
    "brackish",
    "bracteal",
    "bracteate",
    "bracted",
    "bracteolate",
    "brag",
    "braggart",
    "bragging",
    "braggy",
    "brahminic",
    "brahminical",
    "braided",
    "brainish",
    "brainless",
    "brainsick",
    "brainwashed",
    "brainy",
    "braised",
    "braky",
    "braless",
    "brambly",
    "branched",
    "branchial",
    "branchiate",
    "branching",
    "branchiopod",
    "branchiopodan",
    "branchiopodous",
    "branchless",
    "branchy",
    "branded",
    "brash",
    "brassbound",
    "brasslike",
    "brassy",
    "brattish",
    "bratty",
    "brave",
    "braw",
    "brawny",
    "brazen",
    "brazilian",
    "breakable",
    "breakaway",
    "breakneck",
    "breasted",
    "breastless",
    "breathed",
    "breathing",
    "breathless",
    "breathtaking",
    "breeched",
    "breeding",
    "breezy",
    "bregmatic",
    "briary",
    "bribable",
    "brickle",
    "brickly",
    "bridal",
    "bridgeable",
    "brief",
    "briefless",
    "briery",
    "bright",
    "brilliant",
    "brimful",
    "brimfull",
    "brimless",
    "brimming",
    "brinded",
    "brindle",
    "brindled",
    "briny",
    "brisant",
    "brisk",
    "bristled",
    "bristlelike",
    "bristly",
    "britannic",
    "british",
    "briton",
    "brittle",
    "broached",
    "broad",
    "broadband",
    "broadleaf",
    "broadloom",
    "broadnosed",
    "broadside",
    "brobdingnagian",
    "brocaded",
    "broiled",
    "broke",
    "broken",
    "brokenhearted",
    "bromic",
    "bromidic",
    "bronchial",
    "bronchiolar",
    "bronchitic",
    "bronchoscopic",
    "bronze",
    "bronzed",
    "bronzy",
    "brooding",
    "broody",
    "brotherlike",
    "brotherly",
    "brown",
    "browned",
    "brownish",
    "bruising",
    "brumal",
    "brummagem",
    "brumous",
    "bruneian",
    "brunet",
    "brunette",
    "brushed",
    "brushlike",
    "brushy",
    "brusk",
    "brusque",
    "brut",
    "brutal",
    "brute",
    "brutish",
    "bryophytic",
    "bubaline",
    "bubbling",
    "bubbly",
    "bubonic",
    "buccal",
    "buckram",
    "buckshee",
    "bucolic",
    "buddhist",
    "buddhistic",
    "budding",
    "budgetary",
    "buff",
    "buffeted",
    "buffoonish",
    "bugged",
    "buggy",
    "built",
    "buirdly",
    "bulbaceous",
    "bulbar",
    "bulbed",
    "bulblike",
    "bulbous",
    "bulgarian",
    "bulging",
    "bulgy",
    "bulimic",
    "bulky",
    "bullate",
    "bulletproof",
    "bullheaded",
    "bullish",
    "bullnecked",
    "bullocky",
    "bully",
    "bullying",
    "bum",
    "bumbling",
    "bumpkinly",
    "bumptious",
    "bumpy",
    "bunchy",
    "bungaloid",
    "bungled",
    "bunglesome",
    "bungling",
    "buoyant",
    "burbling",
    "burbly",
    "burdened",
    "burdenless",
    "burdensome",
    "bureaucratic",
    "burglarious",
    "burglarproof",
    "buried",
    "burked",
    "burled",
    "burlesque",
    "burly",
    "burmese",
    "burnable",
    "burned",
    "burning",
    "burnished",
    "burnt",
    "burred",
    "burrlike",
    "burry",
    "bursal",
    "bursiform",
    "burundi",
    "burundian",
    "bush",
    "bushed",
    "bushwhacking",
    "bushy",
    "businesslike",
    "bust",
    "busted",
    "bustling",
    "busty",
    "busy",
    "busybodied",
    "butch",
    "butcherly",
    "buteonine",
    "butterfingered",
    "buttery",
    "buttoned",
    "buttonlike",
    "buttony",
    "buttressed",
    "butyraceous",
    "butyric",
    "buxom",
    "buzzing",
    "bygone",
    "bypast",
    "byzantine"
  ]

  let w = adj[Math.floor(Math.random() * adj.length)];
  return w.charAt(0).toUpperCase() + w.substring(1);
}
