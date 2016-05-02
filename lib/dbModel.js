(function () {
    <!--##################################Require the Modules########################################################-->

    var dbConn = require('@cloudmpower/globaldb');

    var modelextender = require('@cloudmpower/modelextender');

    var timestamps = require('@cloudmpower/utils').timestamp;

    module.exports.modelForService = function(service){

        var db = dbConn.getdbConn(service);

        var mongoose = dbConn.getConnMongoose(service),
            Schema = mongoose.Schema;

        <!--##################################Division Schema########################################################-->
        <!--#########################################################################################################-->
        var Admin = new Schema({
            userId                  : {type: String, required: true },
            userName                : {type: String, required: true, unique: true },
            password                : {type: String, required: true },
            mobileNo                : {type: String, required: true },
            name                    : {type: String, required: true },
            companyName             : {type: String, required: true },
            emailId                 : {type: String, required: true },
            isActive                : {type: Boolean, default: true }
        });

        Admin.plugin(timestamps);

        var AdminModel = module.exports.Admin = db.model('admin', Admin);
        modelextender.populateModel('Admin', AdminModel);

        <!--##################################Division Schema########################################################-->
        <!--#########################################################################################################-->
        var Division = new Schema({
            divisionName            : {type: String , required: true },
            divisionId              : {type: String , required: true },
            divisionLogo            : {
                "name"                  : {type: String , required: true },
                "size"                  : {type: String , required: true },
                "type"                  : {type: String , required: true },
                "base64String"          : {type: String , required: true }
            }
        });

        Division.plugin(timestamps);

        var DivisionModel = module.exports.Division = db.model('division', Division);
        modelextender.populateModel('Division', DivisionModel);

        <!--##################################Group Schema###########################################################-->
        <!--#########################################################################################################-->
        var Group = new Schema({
            divisionId              : {type: String , required: true },
            groupName               : {type: String , required: true },
            groupId                 : {type: String , required: true },
            groupMembers            : [{
                userId                  : {type: String },
                userName                : {type: String },
                mobileNo                : {type: String },
                name                    : {type: String },
                emailId                 : {type: String }
            }],
            groupManagers           : [{
                userId                  : {type: String },
                userName                : {type: String },
                mobileNo                : {type: String },
                name                    : {type: String },
                emailId                 : {type: String }
            }]
        });

        Group.plugin(timestamps);

        var GroupModel = module.exports.Group = db.model('group', Group);
        modelextender.populateModel('Group', GroupModel);

        <!--##################################GameType Schema########################################################-->
        <!--#########################################################################################################-->
        var GameType = new Schema({
            gameTypeId              : {type: String , required: true },
            gameName                : {type: String , required: true },
            gameScheme              : {}
        });

        GameType.plugin(timestamps);

        var GameTypeModel = module.exports.GameType = db.model('gametype', GameType);
        modelextender.populateModel('GameType', GameTypeModel);

        <!--##################################GameTypeInstruction Schema#############################################-->
        <!--#########################################################################################################-->
        var GameTypeInstruction = new Schema({
            instructionId           : {type: String , required: true },
            gameTypeId              : {type: String , required: true, unique: true },
            gameName                : {type: String , required: true },
            gameInstruction         : {
                instructionText     : {type: String },
                instructionImage    : {}
            }
        });

        GameTypeInstruction.plugin(timestamps);

        var GameTypeInstructionModel = module.exports.GameTypeInstruction = db.model('gametypeinstruction', GameTypeInstruction);
        modelextender.populateModel('GameTypeInstruction', GameTypeInstructionModel);

        <!--##################################Challenges Schema######################################################-->
        <!--#########################################################################################################-->
        var Challenge = new Schema({
            challengeId             : {type: String , required: true },
            challengeName           : {type: String , required: true },
            gameTypeId              : {type: String , required: true },
            gameName                : {type: String , required: true },
            gameTime                : {type: String , required: true },
            gameContent             : [],
            noOfGameQuestions       : {type: String , required: true },
            difficultyLevel         : {type: String , required: true }
        });

        Challenge.plugin(timestamps);

        var ChallengeModel = module.exports.Challenge = db.model('challenge', Challenge);
        modelextender.populateModel('Challenge', ChallengeModel);

        <!--##################################Journey Schema#########################################################-->
        <!--#########################################################################################################-->
        var Journey = new Schema({
            divisionId              : {type: String , required: true },
            journeyId               : {type: String , required: true },
            journeyName             : {type: String , required: true },
            journeyStartDate        : {type: Date , required: true },
            journeyEndDate          : {type: Date , required: true }
        });

        Journey.plugin(timestamps);

        var JourneyModel = module.exports.Journey = db.model('journey', Journey);
        modelextender.populateModel('Journey', JourneyModel);

        <!--##################################JourneyChallenge Schema################################################-->
        <!--#########################################################################################################-->
        var JourneyChallenge = new Schema({
            journeyChallengeId      : {type: String , required: true },
            divisionId              : {type: String , required: true },
            groupId                 : {type: String , required: true },
            journeyId               : {type: String , required: true },
            challenge               : {
                challengeId             : {type: String, required: true},
                challengeName           : {type: String, required: true},
                challengeStartDate      : {type: Date, required: true},
                challengeEndDate        : {type: Date, required: true},
                gameTypeId              : {type: String, required: true},
                gameName                : {type: String, required: true},
                gameTime                : {type: String, required: true},
                gameContent             : [],
                noOfGameQuestions       : {type: String, required: true},
                difficultyLevel         : {type: String, required: true}
            }
        });

        JourneyChallenge.plugin(timestamps);

        var JourneyChallengeModel = module.exports.JourneyChallenge = db.model('journeychallenge', JourneyChallenge);
        modelextender.populateModel('JourneyChallenge', JourneyChallengeModel);

        <!--##################################UserChallenge Schema###################################################-->
        <!--#########################################################################################################-->
        var UserChallenge = new Schema({
            userChallengeId         : {type: String , required: true },
            journeyChallengeId      : {type: String , required: true },
            userId                  : {type: String , required: true },
            divisionId              : {type: String , required: true },
            groupId                 : {type: String , required: true },
            journeyId               : {type: String , required: true },
            challengeStartedAt      : {type: String , required: true },
            challengeSubmittedAt    : {type: String , required: true },
            challenge               : {
                challengeId             : {type: String, required: true },
                challengeName           : {type: String, required: true },
                challengeStartDate      : {type: Date, required: true },
                challengeEndDate        : {type: Date, required: true },
                gameTypeId              : {type: String, required: true },
                gameName                : {type: String, required: true },
                gameTime                : {type: String, required: true },
                gameContent             : [],
                noOfGameQuestions       : {type: String, required: true },
                difficultyLevel         : {type: String, required: true }
            },
            scoring                 : {
                difficulty              : {type: String, required: true },
                correctAnswer           : {type: String, required: true },
                noOfQuestion            : {type: String, required: true },
                timeTaken               : {type: String, required: true },
                totalTime               : {type: String, required: true },
                baseScore               : {type: String, required: true },
                accuracyScore           : {type: String, required: true },
                speedScore              : {type: String, required: true },
                maximumMarks            : {type: String, required: true },
                totalScore              : {type: String, required: true },
                baseMaxScore            : {type: String, required: true },
                accuracyMaxScore        : {type: String, required: true },
                speedMaxScore           : {type: String, required: true }
            }
        });

        UserChallenge.plugin(timestamps);

        var UserChallengeModel = module.exports.UserChallenge = db.model('userchallenge', UserChallenge);
        modelextender.populateModel('UserChallenge', UserChallengeModel);

        <!--##################################Manager Schema#########################################################-->
        <!--#########################################################################################################-->
        var Manager = new Schema({
            divisionId              : {type: String , required: true },
            areaManagers            : [{
                userId                  : {type: String },
                userName                : {type: String },
                mobileNo                : {type: String },
                name                    : {type: String },
                emailId                 : {type: String }
            }],
            regionalManagers        : [{
                userId                  : {type: String },
                userName                : {type: String },
                mobileNo                : {type: String },
                name                    : {type: String },
                emailId                 : {type: String }
            }],
            nationalManagers        : [{
                userId                  : {type: String },
                userName                : {type: String },
                mobileNo                : {type: String },
                name                    : {type: String },
                emailId                 : {type: String }
            }]
        });

        Manager.plugin(timestamps);

        var ManagerModel = module.exports.Manager = db.model('manager', Manager);
        modelextender.populateModel('Manager', ManagerModel);

        <!--##################################PeerGroup Schema#######################################################-->
        <!--#########################################################################################################-->
        var PeerGroup = new Schema({
            divisionId              : {type: String , required: true },
            peerGroupId             : {type: String , required: true },
            peerGroupName           : {type: String , required: true },
            managerList             : [{
                userId                  : {type: String, required: true },
                userName                : {type: String },
                mobileNo                : {type: String },
                name                    : {type: String },
                emailId                 : {type: String }
            }]
        });

        PeerGroup.plugin(timestamps);
        PeerGroup.index( { divisionId: 1, peerGroupName: 1 }, { unique: true } );

        var PeerGroupModel = module.exports.PeerGroup = db.model('peergroup', PeerGroup);
        modelextender.populateModel('PeerGroup', PeerGroupModel);

        <!--##################################Team Schema############################################################-->
        <!--#########################################################################################################-->
        var Team = new Schema({
            divisionId              : {type: String , required: true },
            teamId                  : {type: String , required: true },
            teamName                : {type: String , required: true },
            teamMembers             : [{
                userId                  : {type: String },
                userName                : {type: String },
                mobileNo                : {type: String },
                name                    : {type: String },
                emailId                 : {type: String }
            }],
            areaManagers            : [{
                userId                  : {type: String },
                userName                : {type: String },
                mobileNo                : {type: String },
                name                    : {type: String },
                emailId                 : {type: String }
            }],
            regionalManagers        : [{
                userId                  : {type: String },
                userName                : {type: String },
                mobileNo                : {type: String },
                name                    : {type: String },
                emailId                 : {type: String }
            }],
            nationalManagers        : [{
                userId                  : {type: String },
                userName                : {type: String },
                mobileNo                : {type: String },
                name                    : {type: String },
                emailId                 : {type: String }
            }]
        });

        Team.plugin(timestamps);

        var TeamModel = module.exports.Team = db.model('team', Team);
        modelextender.populateModel('Team', TeamModel);

        <!--##################################UserChallenge Schema###################################################-->
        <!--#########################################################################################################-->
        var UserAverageScore = new Schema({
            userId                  : {type: String , required: true },
            divisionId              : {type: String , required: true },
            groupId                 : {type: String , required: true },
            journeyId               : {type: String , required: true },
            totalChallengeTaken     : {type: Number , default: 0 },
            totalChallengeAllotted  : {type: Number , default: 0 },
            totalScoreAcquired      : {type: Number , default: 0 },
            scoreOutOf              : {type: Number , default: 0 }
        });

        UserAverageScore.plugin(timestamps);

        var UserAverageScoreModel = module.exports.UserAverageScore = db.model('useraveragescore', UserAverageScore);
        modelextender.populateModel('UserAverageScore', UserAverageScoreModel);

        <!--##################################Challenge Report Schema################################################-->
        <!--#########################################################################################################-->
        var ChallengeReport = new Schema({
            userId                  : {type: String , required: true },
            divisionId              : {type: String , required: true },
            groupId                 : {type: String , required: true },
            journeyId               : {type: String , required: true },
            challengeId             : {type: String , required: true },
            challengeName           : {type: String , required: true },
            challengeStartDate      : {type: Date, required: true },
            challengeEndDate        : {type: Date, required: true },
            challengeTimeTaken      : {type: String },
            challengeTotalTime      : {type: String },
            challengeStarted        : {type: Boolean , default: false },
            challengeEnded          : {type: Boolean , default: false },
            challengeStatus         : {type: String , default: 'pending' }
        });

        ChallengeReport.plugin(timestamps);

        var ChallengeReportModel = module.exports.ChallengeReport = db.model('challengereport', ChallengeReport);
        modelextender.populateModel('ChallengeReport', ChallengeReportModel);

        <!--##################################Login Report Schema####################################################-->
        <!--#########################################################################################################-->
        var LoginReport = new Schema({
            userId                  : {type: String, required: true },
            loginTime               : {type: Date },
            userData                : {}
        });

        LoginReport.plugin(timestamps);

        var LoginReportModel = module.exports.LoginReport = db.model('loginreport', LoginReport);
        modelextender.populateModel('LoginReport', LoginReportModel);

        <!--##################################Email Record Schema####################################################-->
        <!--#########################################################################################################-->
        var EmailRecord = new Schema({
            emailRecordId           : {type: String, required: true },
            emailRecordType         : {type: String, required: true },
            emailBodyData           : {},
            emailInfoData           : {},
            emailTemplateName       : {type: String, required: true },
            emailStatus             : {type: String, default: 'pending' }
        });

        EmailRecord.plugin(timestamps);

        var EmailRecordModel = module.exports.EmailRecord = db.model('emailrecord', EmailRecord);
        modelextender.populateModel('EmailRecord', EmailRecordModel);
    };
})();