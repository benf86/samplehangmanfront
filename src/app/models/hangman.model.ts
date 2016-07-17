import {BaseModel} from '../util/extendables/base.model.extendable';

export class HangmanModel extends BaseModel {
    public static create (gameData: string): HangmanModel {
        var temp = JSON.parse(gameData);
        return new HangmanModel({
            visualization: HangmanModel.getStage(temp.game_data.misses),
            uuid: temp.uuid,
            word: temp.game_data._word,
            attempts: temp.game_data.attempts,
            status: temp.game_data.outcome
        });
    }

    private static getStage (stage: int): string {
        if (stage > 5) return stages[5];
        var stages = [
`____`
,
`
_|___
`
,
`
 |
 |
 |
 |
 |
 |
_|___
`
,
`___________
 |/
 |
 |
 |
 |
 |
_|___
`
,
`___________
 |/      |
 |       |
 |       O
 |
 |
 |
_|___
`
,
`___________
 |/      |
 |      (_)
 |      \\|/
 |       |
 |      / \\
 |
_|___
`
        ]

        return stages[stage];
    }
}
