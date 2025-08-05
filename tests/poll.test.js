const { expect } = require('chai');

describe('Voting Logic', () => {
    let votes;

    beforeEach(() => {
        votes = { A: 0, B: 0, C: 0, D: 0 };
    });

    it('should increment vote for valid option', () => {
        const option = 'B';
        if (votes[option] !== undefined) {
            votes[option]++;
        }
        expect(votes.B).to.equal(1);
    });

    it('should ignore invalid vote option', () => {
        const option = 'Z';
        if (votes[option] !== undefined) {
            votes[option]++;
        }
        expect(votes).to.deep.equal({ A: 0, B: 0, C: 0, D: 0 });
    });
});
