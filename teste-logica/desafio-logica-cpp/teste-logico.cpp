#include <iostream>
using namespace std;

int main()
{
    int i, resto, reverso = 0;
    cout << "Digite o número: ";
    cin >> i;
        while(i != 0)
        {
            resto = i % 10;
            reverso = (reverso * 10) + resto;
            i = i / 10;
            i++;
        }

        cout << "Número invertido: " << reverso << endl;

        return reverso;
}