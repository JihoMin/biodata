import six.moves.cPickle as pickle
import gzip
import os
import numpy as np
import scipy.misc
import matplotlib
import matplotlib.pyplot as plt
from math import pow
from numpy import linalg as LA
from sklearn.ensemble import RandomForestClassifier


def load_data(dataset):
    ''' Loads the dataset

    :type dataset: string
    :param dataset: the path to the dataset (here MNIST)
    
    copied from http://deeplearning.net/ and revised by hchoi
    '''

    # Download the MNIST dataset if it is not present
    data_dir, data_file = os.path.split(dataset)
    if data_dir == "" and not os.path.isfile(dataset):
        # Check if dataset is in the data directory.
        new_path = os.path.join(
            os.path.split(__file__)[0],
            dataset
        )
        if os.path.isfile(new_path) or data_file == 'mnist.pkl.gz':
            dataset = new_path

    if (not os.path.isfile(dataset)) and data_file == 'mnist.pkl.gz':
        from six.moves import urllib
        origin = (
            'http://www.iro.umontreal.ca/~lisa/deep/data/mnist/mnist.pkl.gz'
        )
        print('Downloading data from %s' % origin)
        urllib.request.urlretrieve(origin, dataset)

    print('... loading data')

    # Load the dataset
    with gzip.open(dataset, 'rb') as f:
        try:
            train_set, valid_set, test_set = pickle.load(f, encoding='latin1')
        except:
            train_set, valid_set, test_set = pickle.load(f)
    # train_set, valid_set, test_set format: tuple(input, target)
    # input is a numpy.ndarray of 2 dimensions (a matrix)
    # where each row corresponds to an example. target is a
    # numpy.ndarray of 1 dimension (vector) that has the same length as
    # the number of rows in the input. It should give the target
    # to the example with the same index in the input.

    return train_set, valid_set, test_set


# kNN algorithm
# compute ED input test_x with train_set
# idx = argsort( -ED )[:k]
# choose most

def calcED (a, b):
    return LA.norm(a-b)

def kNN (train_x, x):
    # calc ED
    # return smallest k idx
    ED = []
    for t in train_x:
        ED.append(calcED(t, x))
    
    return np.argsort(ED)

def countERR (predict, true_label):
    count = 0
    for i in range(len(predict)):
        if (predict[i] != true_label[i]):
            count+=1
    return count/len(predict)
        
def kNNalgorithm (train_x, train_y, test_x, test_y):
    #kNN for each testSet
    # print("----------------kNN--------------------")
    ks = [1, 5, 10]
    idc = []
    # i = 0
    for x in test_x:
        idx = kNN(train_x, x)
        idc.append(idx)
        # if (i%1000 == 0):
        #     print('i= ', i)
        #     # print('predict= ', p_label)
        # i+=1

    for k in ks:
        predict = []
        i = 0
        for i in range( len(test_x) ):
            idx = idc[i][:k]
            count = np.bincount(train_y[idx])
            p_label = np.argmax(count)
            predict.append(p_label)
            
        e_rate = countERR(predict, test_y)
        acc = (1 - e_rate) * 100

        print("k: ",k)
        print("accuracy: ", acc)

def PCA (train_x, dim):
    # 784x784
    cov = np.cov(train_x.T)
    w, v = LA.eig(cov)
    
    # print(v.shape)
    idx = np.argsort(-w)
    # print(w[idx].shape)
    # dim x 784
    sortedV = v.T[idx]
    featureMtx = sortedV[:dim]
    return featureMtx

'''
LDA algorithm
1. 분류: 숫자 레이블별로 10개 클래스로 분류
2. calc: global_mean, class_mean
3. calc: 
    - Sw => within_class_scatter = sum_class(sum_xinC( matmul((x-class_m[i]).reshape((28,28)),(x-class_m[i]).reshape((28,28)).T) ))
    - Sb => between_class_scatter = sum_class(n_i*matmul( (class_m[i]-global_m), (class_m[i]-global_m).T))
4. calc: target = matmul( np.LA.inv( Sw.reshape((28,28)), Sb.reshape((28,28)) ) )
5. calc: w, v = LA.eig(target)
6. return v[:k]
'''
def classify_by_label (train_x, train_y, lebel):
    classified = []
    for i, y in enumerate(train_y):
        if(y==lebel):
            classified.append(train_x[i])
        # print(i)
    return np.array(classified)
            
def classify_train_data (train_x, train_y):
    classified_complete = []
    for i in range(10):
        classified = classify_by_label(train_x,train_y,i)
        classified_complete.append(classified)
    return np.array(classified_complete)

def LDA (classified, train_x, train_y, dim):
    #(1,784)
    global_mean = calc_mean(train_x)
    print(global_mean.shape)

    #(10, 784)
    class_mean = []
    for c in classified:
        class_mean.append(calc_mean(c))
    class_mean = np.array(class_mean)
    print(class_mean.shape)

    #(28,28)
    within_class_scatter = calc_within_class_scatter(classified, class_mean)
    between_class_scatter = calc_between_class_scatter(classified, class_mean, global_mean)

    # print("within: ", within_class_scatter)
    # print("inv: ", LA.inv(within_class_scatter))
    
    target = np.matmul(LA.pinv(within_class_scatter), between_class_scatter)
    # print("target: ",target[200])
    # print("target: ",target[201])
    w, v = LA.eig(target)
    idx = np.argsort(-w)
    sortedV = v.T[idx]
    featureMtx = sortedV[:dim]

    return featureMtx

def calc_mean (data):    
    return np.mean(data, axis=0)

def calc_within_class_scatter (classified, class_mean):
    # within_class_scatter = sum_class(sum_xinC( matmul((x-class_m[i]).reshape((28,28)),(x-class_m[i]).reshape((28,28)).T) ))
    print("calc Sw")
    # within(784,784)
    within_class_scatter = np.zeros((784,784))
    print("w", within_class_scatter)
    for i, c in enumerate(classified):
        # Si = np.zeros((28,28))
        # print(Si)
        # x(784, )
        print("class in Sw: ",i)
        for x in c:
            # mi(784, )
            # print("cmin",class_mean[i].shape)
            dif = (x - class_mean[i]).reshape((1,784))
            dif_transpose = dif.T
            # print(dif_transpose.shape)
            # print("dif", dif)
            Si = np.matmul(dif_transpose, dif)
            # print("Si", np.sum(Si) )
            within_class_scatter += Si
    return within_class_scatter

def calc_between_class_scatter (classified, class_mean, global_mean):
    #between_class_scatter = sum_class(n_i*matmul( (class_m[i]-global_m), (class_m[i]-global_m).T))
    print("---calc Sb---")
    between_class_scatter = np.zeros((784,784))
    # gm (784, )
    # mi (784, )
    print("gm: ", global_mean.shape)
    for i,mi in enumerate(class_mean):
        # print("mi: ", mi.shape)
        dif = (mi - global_mean).reshape((1,784))
        dif_transpose = dif.T
        between_class_scatter += len(classified[i]) * np.matmul(dif_transpose, dif)
    print(between_class_scatter.shape)
    return between_class_scatter


if __name__ == '__main__':
    train_set, val_set, test_set = load_data('mnist.pkl.gz')

    train_x, train_y = train_set
    val_x, val_y = val_set
    test_x, test_y = test_set

    dim = 9

    classified_complete = classify_train_data(train_x, train_y)
    print(len(classified_complete))
    featureMtx_LDA = LDA(classified_complete, train_x, train_y, dim)
    featureMtx_PCA = PCA(train_x, 9)

    # # kNN on LDA_projected data (custom kNN)
    # print("------kNN on LDA_projected data-----")
    
    # #LDA_projected_train_x_dim(dim, 5000)
    # print("LDA dim: 2")
    # LDA_projected_train_x_dim2 = np.matmul(featureMtx_LDA[:2], train_x[:5000].T)
    # LDA_projected_test_x_dim2 = np.matmul(featureMtx_LDA[:2], test_x[:5000].T)
    # kNNalgorithm(LDA_projected_train_x_dim2.T, train_y, LDA_projected_test_x_dim2.T, test_y)

    # print("LDA dim: 5")
    # LDA_projected_train_x_dim5 = np.matmul(featureMtx_LDA[:5], train_x[:5000].T)
    # LDA_projected_test_x_dim5 = np.matmul(featureMtx_LDA[:5], test_x[:5000].T)
    # kNNalgorithm(LDA_projected_train_x_dim5.T, train_y, LDA_projected_test_x_dim5.T, test_y)

    # print("LDA dim: 9")
    # LDA_projected_train_x_dim9 = np.matmul(featureMtx_LDA[:9], train_x[:5000].T)
    # LDA_projected_test_x_dim9 = np.matmul(featureMtx_LDA[:9], test_x[:5000].T)
    # kNNalgorithm(LDA_projected_train_x_dim9.T, train_y, LDA_projected_test_x_dim9.T, test_y)

    # using scikit-learn knn
    from sklearn.neighbors import KNeighborsClassifier

    neighbors = np.array([1,5,10])

    # for i,k in enumerate(neighbors):
    #     #Setup a knn classifier with k neighbors
    #     knn = KNeighborsClassifier(n_neighbors=k)
    #     print("------kNN on LDA_projected data k: ", k)
    #     print("LDA dim: 2")
    #     LDA_projected_train_x_dim2 = np.matmul(featureMtx_LDA[:2], train_x[:5000].T)
    #     LDA_projected_test_x_dim2 = np.matmul(featureMtx_LDA[:2], test_x[:5000].T)
    #     knn.fit(LDA_projected_train_x_dim2.T, train_y[:5000])
    #     score2 = knn.score(LDA_projected_test_x_dim2.T, test_y[:5000])
    #     print("score: ", score2)

    #     print("LDA dim: 3")
    #     LDA_projected_train_x_dim3 = np.matmul(featureMtx_LDA[:3], train_x[:5000].T)
    #     LDA_projected_test_x_dim3 = np.matmul(featureMtx_LDA[:3], test_x[:5000].T)
    #     knn.fit(LDA_projected_train_x_dim3.T, train_y[:5000])
    #     score3 = knn.score(LDA_projected_test_x_dim3.T, test_y[:5000])
    #     print("score: ", score3)

    #     print("LDA dim: 5")
    #     LDA_projected_train_x_dim5 = np.matmul(featureMtx_LDA[:5], train_x[:5000].T)
    #     LDA_projected_test_x_dim5 = np.matmul(featureMtx_LDA[:5], test_x[:5000].T)
    #     knn.fit(LDA_projected_train_x_dim5.T, train_y[:5000])
    #     score5 = knn.score(LDA_projected_test_x_dim5.T, test_y[:5000])
    #     print("score: ", score5)

    #     print("LDA dim: 9")
    #     LDA_projected_train_x_dim9 = np.matmul(featureMtx_LDA[:9], train_x[:5000].T)
    #     LDA_projected_test_x_dim9 = np.matmul(featureMtx_LDA[:9], test_x[:5000].T)
    #     knn.fit(LDA_projected_train_x_dim9.T, train_y[:5000])
    #     score9 = knn.score(LDA_projected_test_x_dim9.T, test_y[:5000])
    #     print("score: ", score9)

    
    # for i,k in enumerate(neighbors):
    #     print("------kNN on PCA_projected data k: ", k)
    #     dim = np.array([2,3,5,9])
    #     knn = KNeighborsClassifier(n_neighbors=k)
    #     for j, d in enumerate(dim):
    #         # projected_x (dim x 50000)
    #         print("eigenspaceDim: ", d)
    #         projectedTrain_x = np.matmul(featureMtx_PCA[:d], train_x[:5000].T)
    #         projectedTest_x = np.matmul(featureMtx_PCA[:d], test_x[:5000].T)
    #         knn.fit(projectedTrain_x.T, train_y[:5000])
    #         score = knn.score(projectedTest_x.T, test_y[:5000])
    #         print("score: ", score)
    
    # rfc PCA

    print("------RFC on PCA_projected data---- ")
    dim = np.array([2,3,5,9])
    
    for j, d in enumerate(dim):
        # projected_x (dim x 50000)
        print("eigenspaceDim: ", d)
        projectedTrain_x = np.matmul(featureMtx_PCA[:d], train_x[:5000].T)
        projectedTest_x = np.matmul(featureMtx_PCA[:d], test_x[:5000].T)

        rfc = RandomForestClassifier(n_jobs=-1, n_estimators=10)
        rfc.fit(projectedTrain_x.T, train_y[:5000])
        score = rfc.score(projectedTest_x.T, test_y[:5000])
        print("score: ", score)

    # rfc LDA
    print("------RFC on PCA_projected data---- ")
    dim = np.array([2,3,5,9])
    
    for j, d in enumerate(dim):
        # projected_x (dim x 50000)
        print("eigenspaceDim: ", d)
        projectedTrain_x = np.matmul(featureMtx_LDA[:d], train_x[:5000].T)
        projectedTest_x = np.matmul(featureMtx_LDA[:d], test_x[:5000].T)

        rfc = RandomForestClassifier(n_jobs=-1, n_estimators=10)
        rfc.fit(projectedTrain_x.T, train_y[:5000])
        score = rfc.score(projectedTest_x.T, test_y[:5000])
        print("score: ", score)


    # # kNN on raw data
    # kNNalgorithm(train_x[:5000], train_y, test_x[:5000], test_y)
    
    # # # PCA -> kNN
    # dim = 2
    # featureMtx = PCA(train_x, dim)

    # # projected_x (dim x 50000)
    # projectedTrain_x = np.matmul(featureMtx, train_x.T)
    # projectedTest_x = np.matmul(featureMtx, test_x.T)
    # print("eigenspaceDim: ", dim)

    # #kNN on dimension-reduced
    # kNNalgorithm(projectedTrain_x.T[:5000], train_y, projectedTest_x.T[:5000], test_y)

    # # print(projectedTrain_x.shape)
    # plt.scatter(projectedTrain_x[0], projectedTrain_x[1], s=0.1, c=train_y, cmap=plt.get_cmap('jet',10))
    # plt.show()

    # #random_forest
    # print("# random forest")
    # rfc = RandomForestClassifier(n_jobs=-1, n_estimators=10)
    # rfc.fit(train_x, train_y)
    # s = rfc.score(test_x,test_y)
    # print("test accuracy: ", s)
    



    # for eigendecomposition 
    # check http://docs.scipy.org/doc/numpy/reference/generated/numpy.linalg.eig.html 
