import {BaseModel} from '../util/extendables/base.model.extendable';

export class HangmanModel extends BaseModel {
    public static create (gameData): HangmanModel {
        return new HangmanModel({
            visualization: HangmanModel.getStage(gameData.game_data.misses),
            uuid: gameData.uuid,
            word: gameData.game_data._word.map(e => {
                if (!e) return '_';
                return e
            }).join(' '),
            attempts: JSON.stringify(gameData.game_data.attempts, 0, 4),
            status: !!gameData.game_data.outcome ? 'Victory!' : 'Hanged - you lose!'
        });
    }

    private static getStage (stage: number): string {
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
