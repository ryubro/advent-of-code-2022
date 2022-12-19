import { indexOfStartOfMessage, indexOfStartOfPacket } from './6lib';

describe('6lib', () => {
  it('finds index of start of packet', () => {
    expect(indexOfStartOfPacket('bvwbjplbgvbhsrlpgdmjqwftvncz')).toBe(5);
    expect(indexOfStartOfPacket('nppdvjthqldpwncqszvftbrmjlhg')).toBe(6);
    expect(indexOfStartOfPacket('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg')).toBe(10);
    expect(indexOfStartOfPacket('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw')).toBe(11);
  });

  it('finds index of start of message', () => {
    expect(indexOfStartOfMessage('mjqjpqmgbljsphdztnvjfqwrcgsmlb')).toBe(19);
    expect(indexOfStartOfMessage('bvwbjplbgvbhsrlpgdmjqwftvncz')).toBe(23);
    expect(indexOfStartOfMessage('nppdvjthqldpwncqszvftbrmjlhg')).toBe(23);
    expect(indexOfStartOfMessage('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg')).toBe(29);
    expect(indexOfStartOfMessage('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw')).toBe(26);
  });
});
