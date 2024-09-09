import ollama

def init_message_user():
    """
        fonction initialiser la liste des messages
    """
    return  [
        {
            "role": "system",
            "content" : """ """
        }
    ]
    
    

def gene_message_suivant(msg):
    """
        fonction générer un message suivant
    """
    MAX_TOKENS = 100  # Maximum number of tokens to generate
    output = ollama.chat(
        model='mistral',
        messages=msg

    )
    msg.append({"role": "system",
                "content": output['message']['content']})
    
def last_respond_LLM(msg,user_msg):
    """
        on lance la génération du message par le LLM et on le retourne sous forme d'un string directement utilisable
    """
    msg = rajout_message_user(msg, user_msg)
    gene_message_suivant(msg)

    liste_mot = msg[len(msg) - 1]["content"].split(" ")
    liste_mot.insert(20, "\n")
    if len(liste_mot)>40:
        liste_mot.insert(40,"\n")
    if len(liste_mot)>60:
        liste_mot.insert(60,"\n") # flemme de faire une boucle
    new_sentance = ""
    for mot in liste_mot:
        new_sentance += mot + " "
    return  new_sentance



def print_conv(msg):
    """
        fonction afficher la conversation
    """
    for m in msg:
        print(m['role'], ":", m['content'])
    print("\n")


def sauv_message_user(msg, nom_fichier):
    """
        fonction sauvegarder la conversation
    """
    with open(nom_fichier, 'w') as f:
        len_msg = len(msg)
        f.write(f"{len_msg//2} : {msg[len_msg - 2]["content"]}\n")

def reset_fichier_sauv(nom_fichier):
    """
        fonction réinitialiser le fichier de sauvegarde
    """
    with open(nom_fichier, 'w') as f:
        f.write("")


    
def gene_message_suivant_correction(msg):
    """
        fonction générer un message suivant
    """
    output = ollama.chat(
    model='mistral',
    messages=msg
    )
    msg.append({"role": "system",
            "content": output['message']['content']})
    

def mise_en_forme_sentence(message):
    liste = message.split(" ")
    for  i in range(len(liste)//20):
        liste.insert(20*(i+1), "\n")
    new_sentance = ""
    for mot in liste:
        new_sentance += mot + " "
    return new_sentance


def gene_message_correction(msg):
    """
        fonction générer un message suivant
    """
    gene_message_suivant_correction(msg)

    return mise_en_forme_sentence(msg[len(msg) - 1]["content"])

def gene_message_lecon(msg_correction):
    """
        fonction générer une leçon
    """
    msg = init_message_agent_lecon()
    msg = rajout_message_user(msg, msg_correction)
    output = ollama.chat(
    model='mistral',
    messages=msg
    )
    msg.append({"role": "system",
            "content": output['message']['content']})

    lecon_str = mise_en_forme_sentence(msg[len(msg) - 1]["content"])

    return lecon_str