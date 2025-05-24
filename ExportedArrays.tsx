export interface FeatureItem {
    title: string;
    icon: any;
    params: string;
};

export const allFeatures: FeatureItem[] = [
    {
        title: "Get set up",
        icon: require("@/assets/icons/wavingHand.png"),
        params: "getSetUp"
    },
    {
        title: "Ask me anything",
        icon: require("@/assets/icons/8Ball.png"),
        params: "askMeAnything"
    },
    {
        title: "Dating & relationships",
        icon: require("@/assets/icons/heart.png"),
        params: "datingAndRelationships"
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

export const chatHistoryMapping = {
    askMeAnything: {
        title: "Ask me anything",
        icon: require("@/assets/icons/8Ball.png")
    },
    datingAndRelationships: {
        title: "Dating & relationships",    
        icon: require("@/assets/icons/heart.png")
    },
    personalityTest: {
        title: "Personality test",
        icon: require("@/assets/icons/performingArts.png")
    },
    howToBeLiked: {
        title: "How to be liked",
        icon: require("@/assets/icons/cool.png")
    },
    makingRealFriends: {
        title: "Making real friends",
        icon: require("@/assets/icons/fistBump.png")
    },
    influencingPeople: {
        title: "Influencing people",
        icon: require("@/assets/icons/bullseye.png")
    },
    findingMotivation: {
        title: "Finding motivation",
        icon: require("@/assets/icons/rockstarHand.png")
    },
    styleUpgrade: {
        title: "Style upgrade",
        icon: require("@/assets/icons/sunglasses.png")
    },
    getFitFast: {
        title: "Get fit fast",
        icon: require("@/assets/icons/dumbell.png")
    }
};