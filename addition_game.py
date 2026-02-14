import random
import time

def create_dots_representation(count, char='o'):
    """
    数字を視覚的なドットで表現します（コンソール版の簡易表示）。
    """
    return char * count

def generate_new_question():
    """
    新しい足し算の問題を生成します。
    戻り値: (num_a, num_b, correct_answer)
    """
    num_a = random.randint(1, 9)
    num_b = random.randint(1, 9)
    correct_answer = num_a + num_b
    return num_a, num_b, correct_answer

def play_addition_game():
    """
    足し算ゲームのメインロジックです。
    """
    correct_count = 0
    total_count = 0

    print("😊 足し算 れんしゅう 😄")
    print("すきな ふたつの かずの たしざんに ちょうせんしよう！")
    print("-" * 30)

    while True:
        num_a, num_b, correct_answer = generate_new_question()
        total_count += 1

        print(f"もんだい {total_count}:")
        print(f"Aのかず: {create_dots_representation(num_a)} ({num_a})")
        print(f"Bのかず: {create_dots_representation(num_b)} ({num_b})")
        print(f"{num_a} + {num_b} = ?")

        while True:
            try:
                user_answer = int(input("こたえを 入力してね: "))
                break
            except ValueError:
                print("数字で入力してください。")

        if user_answer == correct_answer:
            correct_count += 1
            print(f"🎉 せいかい！ {num_a} + {num_b} = {correct_answer} だね！")
        else:
            print(f"😢 ざんねん... こたえは {correct_answer} だよ。")

        print(f"これまでのせいかい: {correct_count} / もんだいすう: {total_count}")
        print("-" * 30)

        # 次の問題へ進むか尋ねる
        # time.sleep(2) # ウェブ版のような自動進行は行わない
        continue_game = input("つぎのもんだいへすすみますか？ (y/n): ").lower()
        if continue_game != 'y':
            break

    print("ゲーム終了！")
    print(f"最終結果: せいかい {correct_count} / もんだいすう {total_count}")
    print("またあそんでね！")

if __name__ == "__main__":
    play_addition_game()
