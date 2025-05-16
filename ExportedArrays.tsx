export interface FeatureItem {
    title: string;
    icon: any;
    params: string;
};

export const allFeatures: FeatureItem[] = [
    {
        title: "Ask me anything",
        icon: require("@/assets/icons/8Ball.png"),
        params: "askMeAnything"
    },
    {
        title: "Dating & relationships",
        icon: require("@/assets/icons/heart.png"),
        params: "datingRelationships"
    },
    {
        title: "Personality test",
        icon: require("@/assets/icons/performingArts.png"),
        params: "personalityTest"
    },
    {
        title: "How to be liked",
        icon: require("@/assets/icons/cool.png"),
        params: "howToBeLiked"
    },
    {
        title: "Making real friends",
        icon: require("@/assets/icons/fistBump.png"),
        params: "makingRealFriends"
    },
    {
        title: "Influencing people",
        icon: require("@/assets/icons/bullseye.png"),
        params: "influencingPeople"
    },
    // {
    //     title: "Controversial Opinions",
    //     icon: require("@/assets/icons/poolball.svg"),
    //     params: "controversialOpinions"
    // },
    {
        title: "Finding motivation",
        icon: require("@/assets/icons/rockstarHand.png"),
        params: "findingMotivation"
    },
    {
        title: "Style upgrade",
        icon: require("@/assets/icons/sunglasses.png"),
        params: "styleUpgrade"
    }, 
    {
        title: "Get fit fast",
        icon: require("@/assets/icons/dumbell.png"),
        params: "getFitFast"
    }
];

export const needHelpWith = [
    "Exploring my personality",
    "Making friends",
    "Getting people to like me",
    "Dating & relationships",
    "Influencing people",
    "Finding motivation",
    "Upgrading my style",
    "Getting fit fast"
];