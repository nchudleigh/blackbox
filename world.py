from __future__ import print_function
from sys import stdout
from math import *
from random import *

SEA_LEVEL = 0
SEED = 99999999999
BLUE = '\033[94m'
GREEN = '\033[92m'
END = '\033[0m'


def z(x, y):
    """
    Requires x(int), y(int) representing the location that you want the elevation of
    """
    x = sin(x) * SEED

    y = sin(y) * SEED
    result = x + y

    return result % 100


def render_map(size):
    y_max = size
    x_max = int(size * 1.3)
    # count from 1 to 50
    for y in range(1, y_max):
        # count from 1 to 50
        for x in range(1, x_max):
            # get elevation
            el = z(x, y)
            # if greater than sea level, land
            if el > SEA_LEVEL:
                print('{}[g]{}'.format(GREEN, END), end="")
            # otherwise, sea
            else:
                print('{}[b]{}'.format(BLUE, END), end="")
            # stdout.write(str(el))

        print("\n")


def random_sample(size):
    sum_ = 0
    for i in range(1, size):
        x = randint(0, 65)
        y = randint(0, 50)
        sum_ += z(x, y)
        print("({}, {}) ==  {}".format(x, y, z(x, y)))

    print(sum_ / size)


if __name__ == "__main__":
    # render_map(50)
    random_sample(100)
